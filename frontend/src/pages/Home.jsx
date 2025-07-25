import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import LookingForSharingRide from '../components/LookingForSharingRide';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [selectedRide, setSelectedRide] = useState('private');
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const liveTrackingRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const sharingvehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ sharingvehicleFound, setsharingVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        console.log(user);
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })


    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '60%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
             gsap.to(liveTrackingRef.current, {
                height: '0%'
                // height: '70%',
                // padding: 24
                // opacity:1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
            gsap.to(liveTrackingRef.current, {
                height: '60%'
                // height: '70%',
                // padding: 24
                // opacity:1
            })
        }
    }, [ panelOpen ])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    // useGSAP(function () {
    //     if (vehicleFound) {
    //         gsap.to(vehicleFoundRef.current, {
    //             transform: 'translateY(0)'
    //         })
    //     } else {
    //         gsap.to(vehicleFoundRef.current, {
    //             transform: 'translateY(100%)'
    //         })
    //     }
    // }, [ vehicleFound ])

    // useGSAP(function () {
    //     if (sharingvehicleFound) {
    //         gsap.to(sharingvehicleFoundRef.current, {
    //             transform: 'translateY(0)'
    //         })
    //     } else {
    //         gsap.to(sharingvehicleFoundRef.current, {
    //             transform: 'translateY(100%)'
    //         })
    //     }
    // }, [ sharingvehicleFound ])

    useGSAP(function () {
        if(selectedRide==='shared'){
        if (sharingvehicleFound) {
            gsap.to(sharingvehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(sharingvehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }
    if(selectedRide==='private'){
        if (sharingvehicleFound) {
            gsap.to(sharingvehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(sharingvehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }
    }, [ selectedRide,vehicleFound,sharingvehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)


    }

    async function createRide() {
        try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
      
        }
        catch (error) {
            console.error('Failed to create ride:', error.response?.data || error.message)
            // if(!user){
            //     console.log("no user ");
            // }
            // console.log({ pickup,
            //     destination,
            //     vehicleType})
                console.log(user);
        }
    }

    async function createsharingRide() {
        try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/sharingrides/create`, {
            
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
      
        }
        catch (error) {
            console.error('Failed to create ride:', error.response?.data || error.message)
            // if(!user){
            //     console.log("no user ");
            // }
            // console.log({ pickup,
            //     destination,
            //     vehicleType})
                console.log(user);
        }
    }

    async function createlfsRide() {
        try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/lfsrides/create`, {
            
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
      
        }
        catch (error) {
            console.error('Failed to create ride:', error.response?.data || error.message)
            // if(!user){
            //     console.log("no user ");
            // }
            // console.log({ pickup,
            //     destination,
            //     vehicleType})
                console.log(user);
        }
    }

    // async function endlfsRide() {
    //     try{
    //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/lfsrides/end`, {
            
    //         pickup,
    //         destination,
    //         vehicleType
    //     }, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
      
    //     }
    //     catch (error) {
    //         console.error('Failed to create ride:', error.response?.data || error.message)
    //         // if(!user){
    //         //     console.log("no user ");
    //         // }
    //         // console.log({ pickup,
    //         //     destination,
    //         //     vehicleType})
    //             console.log(user);
    //     }
    // }

    return (
        <div  className='h-screen relative overflow-hidden'>
            <div ref={liveTrackingRef} className='h-1/2' >
             
            <div className=' flex flex-col justify-end h-[100%] w-[100%]'>
                {/* <img className='w-16  h-auto object-contain' src="/taxi sharing logo final 3.png" alt="" /> */}
                <LiveTracking />
            </div>
            </div>
           <div className='h-1/2 '>
            <div className=' flex flex-col justify-end h-screen absolute  w-full'>
            
            <div className='flex flex-row justify-center gap-20 h-py-10 top-0 w-full'>
                    <div
                     onClick={() => setSelectedRide('private')}
                    className={`cursor-pointer bg-gray-200 rounded-xl px-6 py-2 ${
                        selectedRide === 'private' ? 'bg-gray-400 font-bold' : ''
                      }`}>
                        <h5 className='text-xl font-semibold '>
                            
                             Private ride
                             
                        </h5>
                        </div>
                        <div 
                         onClick={() => setSelectedRide('shared')}
                         className={`cursor-pointer bg-gray-200 rounded-xl px-6 py-2 ${
                            selectedRide === 'shared' ? 'bg-gray-400 font-bold' : ''
                          }`}>
                        <h5 className='text-xl font-semibold'>
                        Sharing ride
                        </h5>
                        </div>
                </div>
                <div className='h-[100%] p-6 bg-white relative'>
                
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                   
              
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-1 text-lg rounded-lg w-full h-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-1 text-lg rounded-lg w-full h-full mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-1 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                    
                </div>
                <div ref={panelRef} className='bg-white '>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    createlfsRide={createlfsRide}
                    selectedRide={selectedRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}

                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} setsharingVehicleFound={setsharingVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
            <div ref={sharingvehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForSharingRide
                    createRide={createRide}
                    createsharingRide={createsharingRide}
                    setSelectedRide={setSelectedRide}
                    
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setsharingVehicleFound={setsharingVehicleFound}
                    setVehicleFound={setVehicleFound}
                    />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
            </div>
        </div>
    )
}

export default Home