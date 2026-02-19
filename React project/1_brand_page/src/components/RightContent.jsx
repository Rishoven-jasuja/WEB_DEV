import React, { useState, useEffect,useRef } from "react";

const RightContent = ({className}) => {

  let arr=[
    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b9f7d3e9-d9e4-4fc8-b56f-c415a27a69e3/NIKE+AIR+MAX+MOTO+2K.png",

    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/mcdrf7uxgwnem8l0sv0q/NIKE+P-6000.png",
    
    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b58035e4-02b3-4432-bc58-4ab247ede73c/Hyperboot+by+Nike+x+Hyperice.png",

    "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/153f5bc5-d217-41ed-a8c6-d028adae6e9c/NIKE+AIR+MAX+PLUS+VII.png",

    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/494c8ea3-b469-4cad-9721-fb9146dd2119/NIKE+ZOOM+VOMERO+5.png",

    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e1f20e3b-4cac-4e81-8e40-583c92f23e25/AIR+MAX+DN8.png"
  ]

  const [pause, setpause] = useState(false);
  const [idx, setidx] = useState(0);

  const touchStartX = useRef(0);
const touchEndX = useRef(0);
//these are used for sliding on mobile with finger 

// useref are used to store any value but dont do any re render of our page unlike the usestate
  const nextidx=()=>{
      setidx(prev=>(prev+1)%arr.length);
  }
  const previdx=()=>{
    setidx(prev=>(prev-1+arr.length)%arr.length);
  }


  const handleTouchStart = (e) => {
  touchStartX.current = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.current = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const distance = touchStartX.current - touchEndX.current;

  if (distance > 50) nextidx();   // swipe left → next
  if (distance < -50) previdx();  // swipe right → prev
};


  useEffect(() => {
    if(pause) return;
    const interval = setInterval(nextidx, 2500);

    return () => clearInterval(interval); // cleanup
  }, [pause]);


  return (
    <div className={`w-full md:w-1/2 flex justify-center md:mb-23  ${className} mt-10 md:mt-0 flex-col` }>

      <div className="flex justify-center items-center flex-col mb-5 md:h-[65vh] h-[40vh] "  onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

         <img onMouseEnter={() => setpause(true)} onMouseLeave={() => setpause(false)
          } 
        className="w-full max-w-md object-contain max-h-full transition-opacity duration-500 ease-in-out"
        src={arr[idx]}
        alt="Nike Shoes"
      />


     <div className="flex gap-2 justify-center mt-4 ">
  {arr.map((_, i) => (
    <button
      key={i}
      onClick={() => setidx(i)}
      className={`w-3 h-3 rounded-full ${
        idx === i ? "bg-black" : "bg-gray-400"
      }`}
    />
  ))}
      </div>
     
</div>



    
    </div>
  );
};

export default RightContent;
