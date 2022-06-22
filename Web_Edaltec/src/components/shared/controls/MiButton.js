import React  from 'react'
import Button from '@material-ui/core/Button';

// color = primary ,secondary

export const MiButton = ({ text, variant, color, size, startIcon, onClick} ) => {
  return (
        <Button  variant= { variant || "contained" } color= { color || ""} size=  {size ||"small"} startIcon = {startIcon || "" } onClick={onClick} > {text}</Button>
  )
}
