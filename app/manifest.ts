import type { MetadataRoute } from "next";
export default function manifest():MetadataRoute.Manifest{return {name:"NO WAY / ECHT?",short_name:"NO WAY",description:"Can you tell what's real?",start_url:"/",display:"standalone",background_color:"#f5f3ed",theme_color:"#f5f3ed",icons:[{src:"/icon.svg",sizes:"any",type:"image/svg+xml"}]}}
