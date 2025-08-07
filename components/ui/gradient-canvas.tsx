'use client'

import { ScreenQuad, shaderMaterial } from '@react-three/drei'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { COSINE_GRADIENTS, type CosineGradientPreset } from '@thi.ng/color'
import React, { type FC, useRef, useMemo } from 'react'
import { ShaderMaterial, Vector3 } from 'three'
import { cn } from '@/lib/utils'

// Hardware detection utility
export const detectHardwareCapabilities = () => {
  if (typeof window === 'undefined') return 'medium' // SSR fallback
  
  // Get basic hardware info
  const cpuCores = navigator.hardwareConcurrency || 4
  const memory = (navigator as any).deviceMemory || 4 // GB
  const platform = navigator.platform.toLowerCase()
  
  // Check if it's mobile
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
  
  // Check for dedicated GPU hints
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  const webglContext = gl as WebGLRenderingContext | null
  const renderer = webglContext?.getParameter(webglContext.RENDERER) || ''
  const hasDedicatedGPU = /nvidia|amd|radeon|geforce|quadro/i.test(renderer as string)
  
  // Scoring system
  let score = 0
  
  // CPU cores
  if (cpuCores >= 8) score += 3
  else if (cpuCores >= 4) score += 2
  else score += 1
  
  // Memory
  if (memory >= 8) score += 3
  else if (memory >= 4) score += 2
  else score += 1
  
  // GPU
  if (hasDedicatedGPU) score += 3
  else score += 1
  
  // Platform penalties
  if (isMobile) score -= 2
  if (platform.includes('arm')) score -= 1
  
  // Determine performance tier
  if (score >= 8) return 'high'
  else if (score >= 5) return 'medium'
  else return 'low'
}

// Performance presets
export const PERFORMANCE_PRESETS = {
  low: {
    distortionIterations: 2,
    distortionIntensity: 0.15,
    timeMultiplier: 0.05,
    dpr: [0.5, 1] as [number, number],
    useSimpleNoise: true
  },
  medium: {
    distortionIterations: 8,
    distortionIntensity: 0.35,
    timeMultiplier: 0.1,
    dpr: [1, 1.5] as [number, number],
    useSimpleNoise: false
  },
  high: {
    distortionIterations: 8,
    distortionIntensity: 0.35,
    timeMultiplier: 0.15,
    dpr: [1, 2] as [number, number],
    useSimpleNoise: false
  }
}

// Shader definitions
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

// Dynamic fragment shader generator
const createFragmentShader = (useSimpleNoise: boolean) => `
uniform float uTime;
uniform vec3 uColourPalette[4];
uniform float uUvScale;
uniform float uUvDistortionIterations;
uniform float uUvDistortionIntensity;

varying vec2 vUv;

${useSimpleNoise ? `
float noise(vec3 p) {
  return fract(sin(dot(p.xyz, vec3(12.9898,78.233,45.164))) * 43758.5453123);
}
` : `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

float noise(vec3 p) {
  return snoise(p);
}
`}

vec3 cosineGradientColour(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return clamp(a + b * cos(6.28318 * (c * t + d)), 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  uv *= uUvScale;

  for (float i = 0.0; i < uUvDistortionIterations; i++) {
    uv += noise(vec3(uv - i * 0.2, uTime + i * 32.)) * uUvDistortionIntensity;
  }

  float colourInput = noise(vec3(uv, sin(uTime))) * 0.5 + 0.5;
  vec3 colour = cosineGradientColour(colourInput, uColourPalette[0], uColourPalette[1], uColourPalette[2], uColourPalette[3]);

  gl_FragColor = vec4(colour, 1.0);
}
`

type Uniforms = {
  uTime: number
  uColourPalette: Vector3[]
  uUvScale: number
  uUvDistortionIterations: number
  uUvDistortionIntensity: number
}

const DEFAULT_COLOUR_PALETTE: Vector3[] = COSINE_GRADIENTS['yellow-purple-magenta'].map((color) => new Vector3(...color))

const INITIAL_UNIFORMS: Uniforms = {
  uTime: 0,
  uColourPalette: DEFAULT_COLOUR_PALETTE,
  uUvScale: 1,
  uUvDistortionIterations: 0,
  uUvDistortionIntensity: 0,
}

// Create shader materials for different performance levels
const createShaderMaterial = (useSimpleNoise: boolean) => {
  const fragmentShader = createFragmentShader(useSimpleNoise)
  return shaderMaterial(INITIAL_UNIFORMS, vertexShader, fragmentShader)
}

const LowEndMaterial = createShaderMaterial(true)
const HighEndMaterial = createShaderMaterial(false)

extend({ LowEndMaterial, HighEndMaterial })

type ShaderMaterialProps = {
  ref?: React.Ref<ShaderMaterial>
  key?: string | number
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    lowEndMaterial: ShaderMaterialProps & Partial<Uniforms>
    highEndMaterial: ShaderMaterialProps & Partial<Uniforms>
  }
}

// Internal gradient background component
const GradientBackground: FC<{
  colourPalette: Vector3[]
  timeMultiplier: number
  scale: number
  distortionIterations: number
  distortionIntensity: number
}> = ({
  colourPalette,
  timeMultiplier,
  scale,
  distortionIntensity,
  distortionIterations,
}) => {
  const gradientShader = useRef<ShaderMaterial & Partial<Uniforms>>(null)
  
  // Detect hardware capabilities and get preset
  const performanceTier = useMemo(() => detectHardwareCapabilities(), [])
  const preset = PERFORMANCE_PRESETS[performanceTier]
  
  // Use hardware-appropriate settings
  const actualIterations = distortionIterations || preset.distortionIterations
  const actualIntensity = distortionIntensity || preset.distortionIntensity
  const actualTimeMultiplier = timeMultiplier || preset.timeMultiplier

  useFrame(({ clock }) => {
    if (!gradientShader.current) return
    
    // Update time with the multiplier
    const adjustedTime = clock.elapsedTime * actualTimeMultiplier
    gradientShader.current.uTime = adjustedTime
  })

  // Choose material based on performance tier
  const MaterialComponent = preset.useSimpleNoise ? 'lowEndMaterial' : 'highEndMaterial'

  return (
    <ScreenQuad>
      <MaterialComponent
        key={preset.useSimpleNoise ? 'low' : 'high'}
        ref={gradientShader}
        uTime={0}
        uColourPalette={colourPalette}
        uUvScale={scale}
        uUvDistortionIterations={actualIterations}
        uUvDistortionIntensity={actualIntensity}
      />
    </ScreenQuad>
  )
}

// Main GradientCanvas component
type GradientCanvasProps = {
  containerClassName?: string
  canvasClassName?: string
  palette?: CosineGradientPreset
  style?: React.CSSProperties
}

export const GradientCanvas: React.FC<GradientCanvasProps> = ({
  containerClassName,
  canvasClassName,
  palette = 'blue-magenta-orange',
  style,
  ...props
}) => {
  const gradientPalette = useMemo(() => 
    COSINE_GRADIENTS[palette].map((color) => new Vector3(...color)),
    [palette]
  )
  
  // Detect hardware on client side
  const performanceTier = useMemo(() => detectHardwareCapabilities(), [])
  const preset = PERFORMANCE_PRESETS[performanceTier]
  
  return (
    <div 
      className={cn("relative overflow-hidden w-full h-full", containerClassName)}
      style={style}
      {...props}
    >
      <Canvas
        className={cn("w-full h-full", canvasClassName)}
        dpr={preset.dpr}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: performanceTier === 'low' ? "low-power" : "default",
        }}
      >
        <GradientBackground
          colourPalette={gradientPalette}
          timeMultiplier={preset.timeMultiplier}
          scale={1}
          distortionIterations={preset.distortionIterations}
          distortionIntensity={preset.distortionIntensity}
        />
      </Canvas>
    </div>
  )
}
