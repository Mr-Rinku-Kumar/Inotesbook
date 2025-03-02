import React from 'react'
import '../styles/Alert.css'; // Update the import path to reflect the new folder structure

 const Alert=(props) =>{
  return (
    props.alert && <div className="alert alert-success" role="alert" style={{height:'20px',lineHeight: "1px",textAlign:"center"}} >
  {props.alert.massage}
</div>
  )
}
export default Alert;