import React from "react";

import { Carousel } from '@mantine/carousel';

import '@mantine/carousel/styles.css';


export type CarouselCustomProps = {
  childs: React.ReactNode[]
}
const CarouselCustom: React.FC<CarouselCustomProps> = (props) => {
  return (
    <Carousel slideSize="80%" align="center" slideGap="md" withControls={false}>
      {
        props.childs.map((item, index) =>
          <Carousel.Slide key={index}>{item}</Carousel.Slide>
        )
      }
    </Carousel>
  )
}

export default CarouselCustom;