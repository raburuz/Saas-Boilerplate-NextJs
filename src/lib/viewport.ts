
/* NEXT */
import { Viewport } from 'next';

/* CONFIG */
import { config } from '@/config';

const { seo: seoAttributes } = config.marketing;

const defaultViewport = ( data?: Partial<Viewport> ): Viewport => {

  return {
    //TODO: Move to viewport
    themeColor: data?.themeColor && seoAttributes.theme_color,
    colorScheme: data?.colorScheme && "dark",  
  }

}

export const viewportMetadata = ( data?: Viewport ): Viewport => {

  if(!data) return defaultViewport();

  const { colorScheme, themeColor, ...props } = data;

  return {
    ...defaultViewport({
      colorScheme, 
      themeColor,
    }),
    ...props,
  }
  
} 