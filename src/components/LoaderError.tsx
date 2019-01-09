import * as React from 'react';
import Typography from '@material-ui/core/Typography';

export interface LoaderErrorProps {
}

const LoaderError: React.SFC<LoaderErrorProps> = ({children}) => {
 return <Typography>{children}</Typography>;
}

export default LoaderError;
