import * as React from 'react';

interface SplashScreenProps {
}

const SplashScreen: React.SFC<SplashScreenProps> = ({}) => {
  return (
    <div style={{position:"absolute", width:"100%", height:"100%", textAlign:"center"}}>
      <img style={{position: "absolute", transform: "translate(50%,50%)", top: "50%"}} src="http://th07.deviantart.net/fs71/200H/f/2013/236/d/b/bw_avlonas_a5_beach_isles_wallpaper_image_by_lemnosexplorer-d6jh3i7.jpg" />
    </div>
  );
}

export default SplashScreen;
