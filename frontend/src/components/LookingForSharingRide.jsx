import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setsharingVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Sharing Ride on this way ...</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center space-x-8  '>
                        <div 
                        onClick={()=>{
                            // props.endlfsride() 
                            props.createRide()
                            props.setSelectedRide('private')
                            props.setsharingVehicleFound(false)
                            props.setVehicleFound(true)
                        }}
                        className='cursor-pointer bg-green-200 rounded-xl mr-5 px-6 py-2'>
                        <h5>
                            Switch to Private ride
                        </h5>
                        </div>
                        <div 
                        onClick={()=>{
                            props.createsharingRide()
                            // props.endlfsRide()
                            props.setsharingVehicleFound(false)
                            props.setVehicleFound(true)

                        }}
                        className='cursor-pointer bg-pink-200 rounded-xl px-6 py-2'>
                        <h5>
                            Start a sharing ride 
                        </h5>
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver