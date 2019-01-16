import * as React from 'react';

interface SplashScreenProps {
}

const SplashScreen: React.SFC<SplashScreenProps> = ({}) => {
  return (
    <div style={{position:"absolute", width:"100%", height:"100%", textAlign:"center", backgroundColor:"#fff"}}>
      <img style={{position:"absolute", transform:"translate(-50%,-50%)", top:"50%"}} src="/img/logo/300X300.jpg" />
    </div>
  );
}

export default SplashScreen;
