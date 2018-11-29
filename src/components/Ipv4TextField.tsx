import * as React from 'react';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';

const TextMaskIpV4Address: React.SFC<any> = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".",/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/]}
      placeholderChar={' '}
      keepCharPositions={true}
      showMask
    />
  );
}

export interface Ipv4TextFieldProps {
  [key:string]: any;
}

const Ipv4TextField: React.SFC<Ipv4TextFieldProps> = ({...etc}) => {
  return (
    <TextField
      {...etc}
      InputProps={{
        inputComponent: TextMaskIpV4Address,
      }}
    />
  );
}

export default Ipv4TextField;
