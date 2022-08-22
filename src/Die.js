import React from 'react';

export default function(props) {
    
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }
    
    return (
        <div 
            className="dice" 
            style={styles} 
            onClick = {props.handleClick}
        >
            <p>{props.value}</p>
        </div>
    )
}