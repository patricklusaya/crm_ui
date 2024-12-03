import React from 'react'
import { PropagateLoader, ScaleLoader } from 'react-spinners'

export default function Spinner({color, size, loading}) {
  return (
    <ScaleLoader

    color={color}
    size={size}
    loading = {true}
    
    
    
    />
  )
}
