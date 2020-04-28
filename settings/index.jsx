function mySettings(props) {
  let screenWidth = props.settingsStorage.getItem("screenWidth");
  let screenHeight = props.settingsStorage.getItem("screenHeight");
  
  let colorSet = [
    {color: "#FF00FF"},   
    {color: "#FFFF00"},  
    {color: "#00FFFF"},  
    {color: "#FF0000"},  
    {color: "#00FF00"},  
    {color: "#0000FF"},  

    {color: "white"} ,
    {color: 'black'},
    {color: 'cornsilk'},
    {color: 'gold'},
    {color: 'aquamarine'},
    {color: 'deepskyblue'},

    {color: 'teal'},
    {color: 'violet'},
    {color: 'midnightblue'},
    {color: 'yellowgreen'},
    {color: 'crimson'},
    {color: 'lightseagreen'},

    {color: 'salmon'},
    {color: '#00FA9A'},  
    {color: 'darkred'},  
    {color: 'darkslategrey'},      
    {color: 'darkorchid'},
    {color: 'darkorange'},

    {color: 'lightsteelblue'},
    {color: 'skyblue'},
    {color: '#8B4513'},
    {color: 'khaki'}, 
    {color: 'palegoldenrod'},  
    {color: 'navy'},

    {color: 'deeppink'},
    {color: 'royalblue'},
    {color: 'orangered'},
    {color: 'greenyellow'}, 
    {color: 'tomato'},  
    {color: 'forestgreen'},

    {color: '#00163a'},
    {color: '#21003a'},
    {color: '#3a1d00'},
    {color: '#969696'}, 
    {color: '#494949'}, 
    {color: '#2d2d2d'}
  ];
  
  return (
    <Page>
      <Section
        title="Background Image">
        <ImagePicker
          title="Background Image"
          description="Pick an image to use as your background."
          label="Pick a Background Image"
          sublabel="Background image picker"
          settingsKey="backgroundImage"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
         />
       </Section>
      
      <Section
        title="Time color">
        <ColorSelect
          settingsKey="timeColor"
          colors={colorSet} />
      </Section>
      
      <Section
        title="Steps color">
        <ColorSelect
          settingsKey="stepsColor"
          colors={colorSet} />
      </Section>
      
      <Section
        title="Active Minutes color">
        <ColorSelect
          settingsKey="activeMinutesColor"
          colors={colorSet} />
      </Section>
      
      <Section
        title="Top bar background">
        <ColorSelect
          settingsKey="topBarBackground"
          colors={colorSet} />
      </Section>
      <Section
        title="Top bar color">
        <ColorSelect
          settingsKey="topBarColor"
          colors={colorSet} />
      </Section>
      
      <Section
        title="Bottom bar background">
        <ColorSelect
          settingsKey="bottomBarBackground"
          colors={colorSet} />
      </Section>
         
    </Page>
    
  );
}

registerSettingsPage(mySettings);