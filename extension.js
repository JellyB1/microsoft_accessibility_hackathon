const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

class TextBlob {
  constructor( code) {
    this.code = code
  }
}

class TextToSpeech {
  constructor(subscriptionKey) {
    const sdk = require("microsoft-cognitiveservices-speech-sdk");
    
    const Speaker = require('speaker');

    this.stream = require('stream');
    
    this.subscriptionKey = subscriptionKey
    
    this.speechConfig = sdk.SpeechConfig.fromSubscription(this.subscriptionKey, "eastus");
    
    this.speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;
    
    this.synthesizer = new sdk.SpeechSynthesizer(this.speechConfig, undefined);

    this.speaker = new Speaker({
      channels: 1,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 24000     // 44,100 Hz sample rate
    });

    
  }

  arrayBufferToBuffer(ab) {
    let buffer = new Buffer(ab.byteLength);
    let view = new Uint8Array(ab);
    
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    
    return buffer;
  }

  playAudioFromBuffer(fileContents) {
    let bufferStream = new this.stream.PassThrough();
    
    let data = this.arrayBufferToBuffer(fileContents)
    
    bufferStream.end(data);
    
    bufferStream.pipe(this.speaker);
  }

  textToSpeech(textBlob) {
    let input = ""

    if (textBlob.line == null) {
      input = `${textBlob.code}`
    } else {
      input = `Line ${textBlob.line} ${textBlob.code}`
    }

    this.synthesizer.speakTextAsync(input, result => {
      if (result) {
        this.playAudioFromBuffer(result.audioData)
      }
    },
      error => {
        console.log(error);
      });

  }
}

const parse_text = (str) => { 
  const separators = [')', '(', '[', ']', '{', '}', '"', "'", ';', ".", ","];

  const translate = {
    ";": "semi colon",
    ":": "colon",
    ".": "dot",
    ",": "comma",
    "!": "not",
    "+": "addition",
    "++": "increment",
    "-": "subtraction",
    "--": "decrement",
    "*": "multiplication",
    "/": "division",
    "%": "modulo",
    "=": "is",
    "==": "equal to",
    "===": "equal value and equal type",
    "!=": "not equal",
    "!==": "not equal value or not equal type",
    ">": "greater than",
    ">=": "greater than or equal to",
    "<": "less than",
    "<=": "less than or equal to",
    "[": "open square brace",
    "]": "close square brace",
    "(": "open smooth brace",
    ")": "close smooth brace",
    "{": "open curly brace",
    "}": "close curly brace",
    "'": "single quote",
    '"': "double quote",
    "&&": "and",
    "||": "or",
  };

  const convert = (t) => {

    let string = t;

    for (let i = 0; i < separators.length; i++) {
      const rg = new RegExp("\\" + separators[i], "g");
      string = string.replace(rg, ` ${separators[i]} `)
    }

    let tempText = string.split(' ') 

    tempText.forEach(word => {
      const index = tempText.indexOf(word)
      
      if (index !== -1) {
        return tempText[index] = translate[word] || word  
      }
    })

    return tempText.join(' ')
  }

  return convert(str)
}


function activate(context) {
  const settings = vscode.workspace.getConfiguration('Screenreader')
  
	console.log('Congratulations, your extension "screenreader" is now active!');


  let speak = vscode.commands.registerCommand('screenreader.speak', function () {
    
    const text = editor.document.getText(editor.selection);
    const new_text = parse_text(text)
    
    let test = new TextToSpeech(settings.apiKey);
    
    test.textToSpeech(new TextBlob(new_text));
  });

  context.subscriptions.push(speak);
}

function deactivate() {}

module.exports = {
	activate,
  deactivate
}