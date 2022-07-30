import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

interface Information {
  severity: AlertColor,
  message: string,
  open: boolean,
  handleClose(event?: React.SyntheticEvent | Event, reason?: string): void
}

const AlertInformation = (props: Information) => {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

export default AlertInformation;