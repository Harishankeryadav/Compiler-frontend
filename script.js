let codeMirrorEditor;

document.addEventListener('DOMContentLoaded', function () {
    codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'text/x-c++src',
        theme: 'dracula'
    });

    document.getElementById('language').addEventListener('change', function () {
        const mode = {
            'cpp': 'text/x-c++src',
            'java': 'text/x-java',
            'python': 'text/x-python',
            'javascript': 'text/javascript',
            'c': 'text/x-csrc',
            'csharp': 'text/x-csharp',
            'go': 'text/x-go',
            'php': 'text/x-php',
            'swift': 'text/x-swift'
        }[this.value];
        codeMirrorEditor.setOption('mode', mode);
    });

    document.getElementById('theme').addEventListener('change', function () {
        codeMirrorEditor.setOption('theme', this.value);
    });

    document.getElementById('runButton').addEventListener('click', function() {
        const language = document.getElementById('language').value;
        const code = codeMirrorEditor.getValue();

        document.querySelector('.CodeMirror').style.flex = 6;
        document.querySelector('.output-container').style.flex = 4;

        document.getElementById('loader').style.display = 'block';
        document.getElementById('output').innerText = '';

        fetch('http://your-backend-url/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language, code })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('output').innerText = data.output;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loader').style.display = 'none';
            document.getElementById('output').innerText = 'Error occurred while compiling the code.';
        });
    });

    document.getElementById('clearButton').addEventListener('click', function() {
        codeMirrorEditor.setValue('');
        document.getElementById('output').innerText = '';
    });

    codeMirrorEditor.on('focus', function() {
        document.querySelector('.CodeMirror').style.flex = 7;
        document.querySelector('.output-container').style.flex = 3;
    });
});
