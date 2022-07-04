// audo clip library coded by @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)

const heater = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
  const piano = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

  const soundsName = {
      heaterKit: "Heater Kit",
      smoothPianoKit: "Piano Kit"
  };

  const soundsGroup = {
      heaterKit: heater,
      smoothPianoKit: piano
  }


//begin main component
const App = () => {
    const [power, setPower] = React.useState(true)
    const [volume, setVolume] = React.useState(1);
    const [soundName, setSoundName] = React.useState("heaterKit");
    const [soundType, setSoundType] = React.useState("heaterKit");
    const [sounds, setSounds] = React.useState(soundsGroup[soundType])

    const stop = () => {
        setPower(!power)
    }

    const handleVolumeChange = (event) => {
        setVolume(event.target.value)
    }

    const play = (keyTrigger, sound) => {
        setSoundName(sound)
        const audio = document.getElementById(keyTrigger)
        audio.currentTime = 0;
        audio.play()
    }

    const changeSoundsGroup = () => {
        setSoundName("")
        if(soundType == "heaterKit") {
            setSoundType("smoothPianoKit")
            setSounds(soundsGroup.smoothPianoKit)
        } else {
            setSoundType("heaterKit")
            setSounds(soundsGroup.heaterKit)
        }
    }

    const setKeyVolume = () => {
        const audios = sounds.map(sound => document.getElementById(sound.keyTrigger))
        audios.forEach(audio => {
            if(audio) {
                audio.volume = volume
            }
        })
    }
    
    return (
      <div className="mainDiv" id="drum-machine">
        {setKeyVolume()}
        <div className="wrapper">
          <Keyboard power={power} play={play} sounds={sounds} />
          <DrumControl
            stop={stop}
            power={power}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            name={soundName || soundsName[soundType]} 
            id="display" changeSoundsGroup={changeSoundsGroup}/>
        </div>
      </div>
    )
}

const Keyboard = ({power, play, sounds}) => (
    <div className="keyboard">
        {power 
        ? sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
        : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound, url: "#"}} />)
        }
    </div>
)

const KeyboardKey = ({play, sound: {id, keyTrigger, url, keyCode}}) => {

    const handleKeyDown = (event) => {
        if(event.keyCode == keyCode){
            play(keyTrigger, id)
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
    }, [])

    return (
    <button id={keyCode} className="drum-pad" onClick={() => play(keyTrigger , id)}>
            <audio className="clip" id={keyTrigger} src={url} />
            {keyTrigger}
        </button>
    )
}

const DrumControl = ({stop, name, power, volume, handleVolumeChange, changeSoundsGroup}) => (
    <div className="controls">
      <button className="btn btn-danger" onClick={stop}>Power {power ? "ON" : "OFF"}</button>
      <div>
      <h3>Volume: %{Math.round(volume * 100)}</h3>
        <input 
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
        />
        </div>
        <div className="d-flex flex-column align-items-center">
        <h3 id="display">{name}</h3>
        <button className="btn btn-success" onClick={changeSoundsGroup}>Change Kit</button>
        </div>
    </div>
)

ReactDOM.render(<App/>, document.getElementById("root"));