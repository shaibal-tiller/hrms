import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Attendance = () => {
    const ip_url = 'https://ip.nf/me.json'
    const TILLER = { lat: 23.808933508579187, lon: 90.3678913197626 }
    const [dist,setDistance]= useState()
    const test = () => {
    }
    const [position, setPosition] = useState()

    const getLocation = () => {

        const successCallback = (pos) => {
            setPosition(pos.coords)
        };

        const errorCallback = (error) => {
            setPosition(error)
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    }
    const distance = (lat1, lon1, lat2, lon2, unit) => {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344 
            
            return dist;
        }
    }
    useEffect(() => {
        getLocation()

    }, [])
    useEffect(() => {

        if (position) {
            if (position.code) {
                console.log(position.message);
            }
            else {
               setDistance(distance(position.latitude, position.longitude, TILLER.lat, TILLER.lon, 'K'));
            }

        }
    }, [position])
    return (
        <div className='justify-center  text-center gap-2 mt-2 mx-auto grid grid-cols-2 w-[30%] ' >
            <div className='bg-[#a2c14c]  hover:scale-y-110 hover:scale-x-105 py-4 rounded-lg  text-[#000] text-3xl px-2
    hover:cursor-pointer '>
                PUNCH IN
            </div>
            <div className='bg-[#e66e50]  hover:scale-105 py-4 rounded-lg  text-[#000] text-3xl px-2
    hover:cursor-pointer '>
                OUT OFFICE
            </div>
            <div className='bg-[#68a4bb]  hover:scale-105 py-4 rounded-lg  text-[#000] text-3xl px-2
    hover:cursor-pointer'>
                FIELD WORK
            </div>
            <div className='bg-[#ba7fcc] hover:scale-105  py-4 rounded-lg  text-[#000] text-3xl px-2
    hover:cursor-pointer'>
                PUNCH OUT
            </div>
           {dist &&  <p className='bg-[#fcafcc]' style={{color: dist>0.02? '#ff0000' :'#00ff00'}}> Distance: {dist.toFixed(2)} k.m.</p>}
        </div>
    )
}
export default Attendance