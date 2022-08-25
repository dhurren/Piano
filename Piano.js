
/* 
 * Piano demo By CandleLight
 * Samples By: VSO2 - https://github.com/nbrosowsky/tonejs-instruments
 */

//Define piano key labels.
const keys_white = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]
const keys_black = ["C#4", "D#4", "F#4", "G#4", "A#4"]

//Handle app start.
function OnStart() 
{
    app.ShowProgress()
    app.SetOrientation("Landscape")
    
    //Create main layout.
    lay = app.CreateLayout("Linear", "VCenter,FillXY")
    
    //Draw piano in a layout.
    const layPiano = CreatePiano( keys_white, keys_black )
    lay.AddChild( layPiano )
    
    app.AddLayout(lay)
    
    //Create music component.
    music = app.CreateMusic()
    
    //Create a sampler for 3rd notes.
    sampler = music.CreateSampler({
        files: {
            "C4": "C4.mp3",
            "D4": "D4.mp3",
            "E4": "E4.mp3",
            "F4": "F4.mp3",
            "G4": "G4.mp3",
            "A4": "A4.mp3",
            "B4": "B4.mp3",
            "C#4": "Cs4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "G#4": "Gs4.mp3",
            "A#4": "As4.mp3"
        },
        folder: "Snd"
    })
    
    //Hide progress when all samples are loaded.
    music.SetOnLoaded( function(){app.HideProgress()} )
}

//Draw the piano keys.
function CreatePiano(white, black) 
{
	var key_size = 1/white.length // key width
	
	var layP = app.CreateLayout( "Absolute", "FillX,Center,Horizontal" )
	layP.SetMargins( 0.001, 0, 0, 0 )
	
	var note, left
	
    for(var i=0; i<white.length; i++) {
	    left = (key_size + 0.001) * i
		
		note = app.AddText( layP, white[i][0], key_size, 1 )
		note.SetBackColor( "#EEEEEE" )
		note.SetPosition( left, 0 )
		note.SetOnTouchDown( touchDown )
		note.SetOnTouchUp( touchUp )
		note.data.name = white[i] // note with octave
		note.data.color = "#EEEEEE"
		note.data.press_color = "#BBBBBB"
    }
  
    var next = 0
  
	for(var i=1; i<=white.length; i++) {
		left = (key_size + 0.001) * i
		var name = white[i-1]
		
		if(next >= black.length)
			break
		
		if(name[0].toLowerCase() != black[next][0].toLowerCase()) 
			continue
		
		var card = app.AddLayout( layP, "Card" )
		card.SetCornerRadius( 0 )
		card.SetElevation( 5 )
		card.SetPosition( left-(key_size/4), 0 )
		note = app.AddText( card, black[next].slice(0,2), key_size/2, 1/3 )
		note.SetBackColor( "#222222" )
		note.data.name = black[next] // note with octave
		note.data.color = "#222222"
		note.data.press_color = "#111111"
		note.SetOnTouchDown( touchDown )
		note.SetOnTouchUp( touchUp )
		
		next++
	}
	
	return layP
}

//Handle piano key down.
function touchDown() 
{
    // Play now stop after 2 seconds.
	sampler.PlayStopTone( this.data.name, 2 )
	this.SetBackColor( this.data.press_color )
}

//Handle piano key up.
function touchUp()
{
	this.SetBackColor( this.data.color )
}