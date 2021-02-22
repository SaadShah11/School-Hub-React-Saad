import React, { Fragment, useRef, useMemo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Widget from "../../components/Widget/Widget";
import { Checkbox, Radio, RadioGroup, Button, Stepper, Step, StepLabel, TextField, Typography } from '@material-ui/core';
import { Delete, VideoCall, Photo, Room } from '@material-ui/icons';
import Fee from './fee'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { toLogin } from "../../context/UserContext";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import Checkbox from '@material-ui/core/Checkbox';

import axios from "../../Util/axios"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    instructions: {
        width: "80%",
        margin: 'auto',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    box: {
        width: "50%",
        margin: 'auto',
    },
    box2: {
        display: 'flex',
        flexDirection: 'row'

    },
    Checks: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postbottom: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '5px',
    },
    postbottomL: {
        justifyContent: 'center',
        display: "flex",
        width: '26%',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: "5px",
        padding: "5px",
        backgroundColor: '#f1f1f1',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#C5C5C5'
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        //   alignItems:'center'
    },
    mapContainer: {
        height: "65vh",
        width: '78vh',
    },
}));

function getSteps() {
    return ['Add General Information', 'Add photos/video', 'Add Fee details', 'Add location', 'Finish'];
}
const photos = [
    { name: "photo1", icon: <Delete /> },
    { name: "photo2", icon: <Delete /> },
    { name: "photo3", icon: <Delete /> }
]
const videos = [
    { name: "video", icon: <Delete /> },

]

let bool = false;

let school = {
    adminID: "",
    schoolName: "",
    schoolAddress: "",
    zipCode: 0,
    schoolEmail: "",
    schoolNumber: "",
    schoolFacebook: "",
    schoolType: "",
    educationLevel: [],
    educationType: "",
    images: [],
    video:"",
    feeDetails:{},
    map:{}
}

let feeDetailsObject = {
    admissionFee:0,
    tutionFee:0,
    examFee:0,
    sportFee:0,
    labFee:0,
    libraryFee:0,
    totalAdmissionFee:0,
    totalMonthlyFee:0,
    others:0
}

let mapObject = {
    longitude:"",
    latitude:""
}

function GetStepContent(stepIndex) {

    var position = [30.3753, 69.3451]
    const classes = useStyles();
    var [schoolTypeValue, setSchoolTypeValue] = useState('Co-Education');
    var [educationTypeValue, setEducationTypeValue] = useState('Matric/Fsc');

    var [schoolNameValue, setSchoolNameValue] = useState('')
    var [schoolAddressValue, setSchoolAddressValue] = useState('')
    var [zipCodeValue, setZipCodeValue] = useState('')
    var [schoolEmailValue, setSchoolEmailValue] = useState('')
    var [schoolNumberValue, setSchoolNumberValue] = useState('')
    var [schoolFacebookValue, setSchoolFacebookValue] = useState('')

    const [state, setState] = React.useState({
        junior: true,
        middle: false,
        higher: false,
    });

    const handleChangeCheckbox = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log("inside checkbox hndlechange")
        console.log(state)
    };

    const { junior, middle, higher } = state;

    const handleChangeSchoolType = (event) => {
        setSchoolTypeValue(event.target.value);
    };
    const handleChangeEducationType = (event) => {
        setEducationTypeValue(event.target.value);
    };

    const sendRequest = useCallback(async (bool) => {
        //Asyn is a request that is supposed to be send out of the application,
        //thats why we use async function

        console.log("inside useEffect")
        async function fetchData() {
            //await means wait for the requests come back
            console.log('inside fetchdata')
            console.log(bool)
            let request;

            if (bool === true) {
                console.log("inside add school")
                console.log(school)
                request = await axios.post('http://localhost:8080/school/Create_School', school)
                console.log(request)
                bool = false
            }
            else if (bool === false) {
                console.log("inside school else")
            }
            console.log(request)
            return request;
        }
        //And here you call it
        fetchData()

    }, [])

    switch (stepIndex) {
        case 0:
            return <div className={classes.box}>
                <Widget title='General Information' disableWidgetMenu>
                    <TextField id="name" placeholder="School Name" fullWidth
                        value={schoolNameValue}
                        onChange={e => setSchoolNameValue(e.target.value)} />
                    <TextField id="address" placeholder="School Address" fullWidth
                        value={schoolAddressValue}
                        onChange={e => setSchoolAddressValue(e.target.value)} />
                    <TextField id="zip" placeholder="Zip code" fullWidth
                        value={zipCodeValue}
                        onChange={e => setZipCodeValue(e.target.value)} />
                    <TextField id="email" placeholder="School Email" fullWidth
                        value={schoolEmailValue}
                        onChange={e => setSchoolEmailValue(e.target.value)} />
                    <TextField id="contact" placeholder="School Phone Number" fullWidth
                        value={schoolNumberValue}
                        onChange={e => setSchoolNumberValue(e.target.value)} />
                    <TextField id="facebook" placeholder="School Facebook Link" fullWidth
                        value={schoolFacebookValue}
                        onChange={e => setSchoolFacebookValue(e.target.value)} />

                    <div className={classes.Checks}>
                        <text style={{ fontWeight: 'bold' }}>School type: </text>
                        <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={schoolTypeValue} onChange={handleChangeSchoolType}>
                            <FormControlLabel value="Co-Education" control={<Radio />} label="Co-Education" />
                            <FormControlLabel value="Boys" control={<Radio />} label="Boys" />
                            <FormControlLabel value="Girls" control={<Radio />} label="Girls " />
                        </RadioGroup>
                    </div >
                    {/* <div className={classes.Checks}>
                        <text style={{ fontWeight: 'bold' }}>Education level: </text>
                        <div>
                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Junior" />
                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Middle" />
                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Higher" />
                        </div>

                    </div> */}
                    <div className={classes.Checks}>
                        <text style={{ fontWeight: 'bold' }}>Education level: </text>
                        <FormControl component="fieldset" >
                            {/* <FormLabel component="legend">Education levell:</FormLabel> */}
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={junior} onChange={handleChangeCheckbox} name="junior" />}
                                    label="junior"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={middle} onChange={handleChangeCheckbox} name="middle" />}
                                    label="middle"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={higher} onChange={handleChangeCheckbox} name="higher" />}
                                    label="higher"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>
                    <div className={classes.Checks}>
                        <text style={{ fontWeight: 'bold' }}>Education type: </text>
                        <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " value={educationTypeValue} onChange={handleChangeEducationType}>
                            <FormControlLabel value="Matric/Fsc" control={<Radio />} label="Matric/Fsc" />
                            <FormControlLabel value="IGCSE" control={<Radio />} label="IGCSE" />
                        </RadioGroup>
                    </div>
                </Widget>

            </div>;
        case 1:
            return <div className={classes.box}>
                <Widget title='Photos/Video' disableWidgetMenu>
                    <div className={classes.postbottom}>
                        <div className={classes.postbottomL}>
                            <Photo fontSize='large' className='icon' />
                            <text>Upload photo</text>
                        </div>
                        <div className={classes.postbottomL}>
                            <VideoCall fontSize='large' className='icon' />
                            <text>Upload Video</text>
                        </div>
                    </div>
                    <div className={classes.postbottom}>
                        <div>
                            {photos.map(function (item) {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ width: '100px' }}><text >{item.name}</text></div>
                                        {item.icon}
                                    </div>

                                )
                            })}
                        </div>

                        {videos.map(function (item) {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ width: '100px' }}><text >{item.name}</text></div>
                                    {item.icon}
                                </div>

                            )
                        })}
                    </div>
                </Widget>
            </div>;;
        case 2:
            return <div className={classes.box}>
                <Widget title='Fee Details' disableWidgetMenu>
                    <Fee />
                </Widget>
            </div>;
        case 3:
            return <div className={classes.box}>
                <text style={{ fontSize: '10px' }}>Double click to go to your current location. <br />
                    Click on map to mark exact location of your school.</text>
                <Widget disableWidgetMenu>
                    <MapContainer center={position}
                        zoom={6}
                        className={classes.mapContainer}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* for my loction */}
                        <LocationMarker />
                        {/* For selected location  */}
                        <AddMarkerToClick />
                    </MapContainer>
                </Widget>
            </div>;
        case 4:
            return <div className={classes.box}>
                <Widget title='Request submitted' disableWidgetMenu>
                    <text>Process for adding your school has been completed.</text>
                    <br />
                    <text>Your request has been submitted and will be processed soon.</text>
                </Widget>
            </div>;;
        default:
            return 'Unknown stepIndex';
    }
}

export default function AdminAdding(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Widget>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </Widget>
                    </div>
                ) : (
                        <div>
                            <div >
                                <Typography className={classes.instructions}>{GetStepContent(activeStep)}</Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    variant="contained" color="inherit"
                                    disabled={activeStep === 0 || activeStep === 4}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="inherit"
                                    onClick={activeStep === 4 ? () => toLogin(props.history) : handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
function LocationMarker() {
    const [position, setPosition] = React.useState(null)
    const map = useMapEvents({
        dblclick() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 15)
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={iconPerson}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
const iconPerson = new L.Icon({
    iconUrl: require('./marker.png'),
    iconSize: [30, 30],

});
function AddMarkerToClick() {

    const [markers, setMarkers] = React.useState([]);

    const map = useMapEvents({
        click(e) {
            const newMarker = e.latlng
            setMarkers([newMarker]);
        },
    })

    return (
        <>
            {markers.map(marker =>
                <Marker position={marker} icon={iconPerson}>
                    <Popup>Latitude: {marker.lat}<br /> Longitutde: {marker.lng}</Popup>
                </Marker>
            )}
        </>
    )
}
