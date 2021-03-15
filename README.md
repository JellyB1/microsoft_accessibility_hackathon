# screenreader README

Screen Reader is a Visual Studio Code extension that allows the user to highlight anything from a single letter to an entire .js file and use the Command Palette to read the code aloud using Microsoft Azure's text-to-speech capabilities.

## Quick Start

To download the extension in VS Code: [Open Store](https://marketplace.visualstudio.com/items?itemName=AngelicaChung.screenreader)

Currently, the extension is only able to read the highlighted text (can be multilined). To read the text aloud, please follow one of these options:

1. Command Palette

After highlighting the text you would like to be read, open the command palette in VS Code, and input the keyword Speak

2. Key Command

After highlighting the text you would like to be read, please press the key combination: 

`cmd` + `shift` + `s` or `ctrl` + `shift` + `s` (depending on your operating system)

## Dev Requirements

In order to run this code, you will need to install the following npm pacakges: 

`npm install microsoft-cognitiveservices-speech-sdk`

`npm install speaker`

## Known Issues

I am working on being able to call up the current line from the VS Code editor.

This extension only supports .js files at this time.

I would love any feedback or suggestions. These can be submitted to the [GitHub Repo Issues](https://github.com/JellyB1/microsoft_accessibility_hackathon/issues).

### 1.0.0

Initial release of Visual Code Extension for Screen Reader. 

-----------------------------------------------------------------------------------------------------------

## License
Begin license text.

Copyright 2021 Angelica Chung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

End license text.

**Enjoy!**
