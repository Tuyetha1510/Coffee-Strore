import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';   
import 'swiper/css';

function Slide() {

    return <>
      <Swiper 
      // install Swiper modules
      modules={[Autoplay,Navigation, Pagination, Scrollbar, A11y]}
      
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      >
         <SwiperSlide><img className='w-full h-[29em] object-center' src='https://www.highlandscoffee.com.vn/vnt_upload/weblink/DIGITAL_Website_1440x460.jpg'/></SwiperSlide>
         <SwiperSlide><img className='w-full h-[29em] object-center' src='https://www.highlandscoffee.com.vn/vnt_upload/weblink/MERCHANDISE_COMERCIAL_2_MERCHANDISE_COMERCIAL_E-BANNER.jpg'/></SwiperSlide>
         <SwiperSlide><img className='w-full h-[29em] object-center' src='https://www.highlandscoffee.com.vn/vnt_upload/weblink/HC_Brand_Refresh_Master_KV_1440x460.png'/></SwiperSlide>
         <SwiperSlide><img className='w-full h-[29em] object-center' src='https://www.highlandscoffee.com.vn/vnt_upload/weblink/BrandFresh/Love.png'/></SwiperSlide>
    </Swiper>
        
    </>
}

export default Slide;