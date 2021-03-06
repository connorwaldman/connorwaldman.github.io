var clientId = '843081425189-tcs4ds00t8sbj5ne54fu0d2au7gfroj0.apps.googleusercontent.com';
            
            if (!/^([0-9])$/.test(clientId[0])) {
                alert('Invalid Client ID - did you forget to insert your application Client ID?');
            }
        // Create a new instance of the realtime utility with your client ID.
        var realtimeUtils = new utils.RealtimeUtils({ clientId: clientId });
        
        authorize();
        
        
        function authorize() {
            // Attempt to authorize
            realtimeUtils.authorize(function(response){
                if(response.error){
                                    // Authorization failed because this is the first time the user has used your application,
                                    // show the authorize button to prompt them to authorize manually.
                    var button = document.getElementById('auth_button');
                    button.classList.add('visible');
                    button.addEventListener('click', function () {
                    realtimeUtils.authorize(function(response){
                        start();
                    }, true);
                });
                } else {
                    start();
                  }
                }, false);
        }
        
        function start() {
            // With auth taken care of, load a file, or create one if there
            // is not an id in the URL.
            var id = realtimeUtils.getParam('id');
            if (id) {
                // Load the document id from the URL
                realtimeUtils.load(id.replace('/', ''), onFileLoaded, onFileInitialize);
            } else {
                 var button = document.getElementById('start_button');
                    button.classList.add('visible');
                    button.addEventListener('click', function () {
                // Create a new document, add it to the URL
                realtimeUtils.createRealtimeFile('New Quickstart File', function(createResponse) {
                    window.history.pushState(null, null, '?id=' + createResponse.id);
                    realtimeUtils.load(createResponse.id, onFileLoaded, onFileInitialize);
                });
                    }
            }
        }
        
        // The first time a file is opened, it must be initialized with the
        // document structure. This function will add a collaborative list
        // to our model at the root.
        function onFileInitialize(model) {
            var string = model.createList();
           collaborativeList.pushAll(['one', 'two', 'three', 'four', 'five']);
            model.getRoot().set('demo_list', collaborativeList);
        }
        
        // After a file has been initialized and loaded, we can access the
        // document. We will wire up the data model to the UI.
        function onFileLoaded(doc) {
            var collaborativeString = doc.getModel().getRoot().get('demo_list');
            wireLists(collaborativeList);
        }
        
        // Connects the text boxes to the collaborative string
        function wireLists(collaborativeList) {
            var list1 = document.getElementById('list_1');
            gapi.drive.realtime.databinding.bindString(collaborativeList, list1);
            
        }
      
            /**
             * Insert new file.
             *
             * @param {File} fileData File object to read data from.
             * @param {Function} callback Function to call when the request is complete.
             */
        function insertFile(fileData, callback) {
            const boundary = '-------314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";
            
            var reader = new FileReader();
            reader.readAsBinaryString(fileData);
            reader.onload = function(e) {
                var contentType = fileData.type || 'application/octet-stream';
                var metadata = {
                    'title': fileData.fileName,
                    'mimeType': contentType
                };
                
                var base64Data = btoa(reader.result);
                var multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;
                
                var request = gapi.client.request({
                    'path': '/upload/drive/v2/files',
                    'method': 'POST',
                    'params': {'uploadType': 'multipart'},
                    'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                     },
                    'body': multipartRequestBody});
                    if (!callback) {
                        callback = function(file) {
                            console.log(file)
                        };
                    }
                    request.execute(callback);
            }
        }
