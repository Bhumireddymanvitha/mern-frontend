import React from 'react';
import { API } from "../../backend";

const ImageHelper =({product}) => {
    const imageurl = product ? `${API}/product/photo/${product._id}` : `https://tse2.mm.bing.net/th?id=OIP.KCSb-dp9OOUQD138fN9L8gHaJ3&pid=Api&P=0&w=300&h=300`
    
    return(
        <div className="rounded border border-success p-2">
                <img
                  src={imageurl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
              </div>
    )
    
}
 export default ImageHelper;