const esprima = require('esprima');
const fs = require('fs');
const path = require('path');
const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

//Reading a File Asynchronously
const readFile = f => new Promise((resolve,reject) =>
    fs.readFile(f,'utf-8', (e,d) => e ? reject(e) : resolve(d) ) )

//Writing A file
const writeFile = (f,data) => new Promise((resolve,reject) =>
    fs.writeFile(f,data, (e) => e ? reject(e) : resolve("Done") ) )


//Check If URL2 is same same-orgin as that of url1
const isSameOrigin = (url1,url2) => {
    let x = url1.split("//")[1].split(".")[0]
    if (x === "www"){
        x = url1.split("//")[1].split(".")[1]
    }
    return (String((new URL(url2)).hostname).includes(x)) ? 1: 0;
}

//Convert a File to Esprima Tree
const getTree = data => new Promise((resolve, reject) => {
    try {
        ans = {}    
        ans = esprima.parseScript(data, { comment: true });
        resolve(ans)
    } catch(err) {
        reject(err)
    }
})

//Check if given string is a Valid URL or not
const isURL = (str) => {
	if ((str.includes("http") && str.length < 9)|| (str.includes(":") && !str.includes("\/"))) { return false}
	var validUrl = require('valid-url');
	if (validUrl.isUri(str)){
		return true;
	} 
	else {
		return false;
	}
}

//Get all identifiers from a Tree
const getIdentifiers = (tree,dict) => {
    Object.keys(tree).forEach(a => {
    	if (Array.isArray(tree[a])){
        	tree[a].forEach(b => {
                if (b) {
                  getIdentifiers(b,dict);
                }
        	})
        } else if (tree[a] instanceof Object){
            getIdentifiers(tree[a],dict);
        } else if (a === "type" && tree.type === "Identifier"){
    		if (Object.prototype.hasOwnProperty.call(dict.identifiers,tree.name)){
                dict.identifiers[tree.name] += 1 
            } else {
                dict.identifiers[tree.name] = 1
            }
        }
    })                   
}

//Given the tree, Returns Number of Variable Declarations in JS File.
const findNumOfVariables = (tree) => {
    let numOfVar = 0;
    Object.keys(tree).forEach(a => {
        if (Array.isArray(tree[a])){
            tree[a].forEach(b => {numOfVar += b ? findNumOfVariables(b) : 0;})
        } else if (tree[a] instanceof Object){
            numOfVar +=  findNumOfVariables(tree[a]);
        } else if (a === "type" && tree.type === "VariableDeclaration"){
            numOfVar += 1;
        }
    })   
    return numOfVar;
}

//Given the tree, Returns Number of Function Declarations in JS File.
const findNumOfFunctions = (tree) => {
    let numOfVar = 0;
    Object.keys(tree).forEach(a => {
        if (Array.isArray(tree[a])){
            tree[a].forEach(b => {numOfVar += b ? findNumOfFunctions(b) : 0;})
        } else if (tree[a] instanceof Object){
            numOfVar +=  findNumOfFunctions(tree[a]);
        } else if (a === "type" && (tree.type === "ArrowFunctionExpression" ||
                                    tree.type === "FunctionDeclaration"       )){
            numOfVar += 1;
        }
    })   
    return numOfVar;
}

//Given the tree, Returns all String Literals in JS File.
const getAllStringLiterals = (tree) => {
    let literals = [];
    Object.keys(tree).forEach(a => {
        if (Array.isArray(tree[a])){
            tree[a].forEach(b => { if (b) { literals.push(...getAllStringLiterals(b)) } })
        } else if (tree[a] instanceof Object){
            literals.push(...getAllStringLiterals(tree[a]));
        } else if ( a === "type"  &&
                    tree.type === "Literal" &&
                    (tree.value instanceof String || typeof tree.value === "string" ) ) {
            literals.push(tree.value);
        }
    })   
    return literals;
}

//Categories Given Links into list of services...
const identifyServices = (services,jsLinks) => {
	jsServices = {}
	jsLinks.forEach(link => {
        hostname = (new URL(link)).hostname;
        done = false
		Object.keys(services).forEach(serv => {
			if (services[serv].includes(hostname)){
				done = true;
				Object.prototype.hasOwnProperty.call(jsServices,serv) ? jsServices[serv].push(link) : (jsServices[serv] = [link]);
			}
		})
		if (done === false){
			Object.prototype.hasOwnProperty.call(jsServices,"Other") ? jsServices["Other"].push(link) : (jsServices["Other"] = [link]);
		}
	})
	return jsServices;
}



//Reading a given Directory
var readDir = (dir) => {
    files = fs.readdirSync(dir)
    let filelist = [];
    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist.push(...readDir(path.join(dir, file)))
        }
        else {
            filelist.push(path.join(dir, file))
        }
    })
    return filelist
}

//Given a file data, identify different services with their Domains.
const JSservices  = (fileData) => {
    services = {}
    data = JSON.parse(fileData)
    data.forEach(i => {
        Object.prototype.hasOwnProperty.call(services, i.categories[0]) ? services[i.categories[0]].push(...i.domains) : (services[i.categories[0]] = [...i.domains])
    })
    return services;
}

//get File Size
const getFileSize = (filename) =>  {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
    return fileSizeInMegabytes;
}

//Given a list of links, separate these links..
const sepLinks = allLinks => {
    types = 
        {
          Image: {
            png: [],
            jpg: [],
            jpeg: [],
            exif: [],
            bmp:  [],
            gif:  [],
            ico:  []
          },
          Script: {
            js: [],
            php:[]
          },
          CSS: {
            css: []
          },
          HTML: {
            html: []
          },
          Others: {
            other: []
          }
        }
    allLinks.forEach(a => {
        done = false
        Object.keys(types).forEach(type => {
            Object.keys(types[type]).forEach(ext => {
                if (a.includes("."+ext)){
                    types[type][ext].push(a)
                    done = true
                }
            })
        })
        if (done === false) {
            types.Others.other.push(a)
        }
    })
    return types;
}

//Given tokens, a token and its quantity, find the token in tokens and increase quantity.
const findObj = (tokens, obj, num) => {
    Object.keys(tokens).forEach(a => {
        Object.keys(tokens[a]).forEach(b => {
            Object.keys(tokens[a][b]).forEach(c => {
                if (c === obj){
                    tokens[a][b][c] += num;
                }
            })
        })
    })
}


//Download JS File and Save It
const downloadJS = async (filename,link) => {
    let file = fs.createWriteStream(filename);
    await new Promise((resolve, reject) => {
        let stream = request({
            uri: link,
            headers: {
                // 'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.90 Mobile Safari/537.36'
            },
            gzip: true
        })
        .pipe(file)
        .on('finish', () => {
            console.log(`Downloaded File ${filename}`)
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        })
        .on('timeout', (error) => {
            reject(error);
        })
    })
    .catch(error => {
        console.log(`Something happened: ${error}`);
    });
};

//Parse Har File
const parseHar = (tree,content,allLinks,contentFirstParty,LinksFirstParty,JSLinks_sameOrigin,JSLinks_nonOrigin) => {
    main_url =tree.log.pages[0].title
    Object.keys(tree).forEach(a => {
        Object.keys(tree[a]).forEach(b => {
            if (b == "entries"){
                Object.keys(tree[a][b]).forEach(c => {
                    allLinks.push(tree[a][b][c].request.url)
                    cur_url = tree[a][b][c].request.url;
                    if (tree[a][b][c].response.headers.filter(a => a.name === "content-type").length) {
                        ext = tree[a][b][c].response.headers.filter(a => a.name === "content-type")
                        // console.log(ext)
                        if (Object.prototype.hasOwnProperty.call(content,ext[0].value)){
                            content[ext[0].value] += 1 
                            if (isSameOrigin(main_url, cur_url)){
                                if (ext[0].value.includes("script")) {
                                    JSLinks_sameOrigin.push(tree[a][b][c].request.url)
                                }
                                contentFirstParty[ext[0].value] += 1
                                LinksFirstParty.push(tree[a][b][c].request.url)
                            } else {
                                if (ext[0].value.includes("script")) {
                                    JSLinks_nonOrigin.push(tree[a][b][c].request.url)
                                }
                            }
                        } else {
                            content[ext[0].value] = 1
                            if (isSameOrigin(main_url, cur_url)){
                                contentFirstParty[ext[0].value] = 1
                                LinksFirstParty.push(tree[a][b][c].request.url)
                                if (ext[0].value.includes("script")) {
                                    JSLinks_sameOrigin.push(tree[a][b][c].request.url)
                                }
                            } else {
                                if (ext[0].value.includes("script")) {
                                    JSLinks_nonOrigin.push(tree[a][b][c].request.url)
                                }
                            }
                        }
                    }
                })
            }
        })
    })
}

//Main Function
/**
 * # of JS in each Site
 * # of same-origin JS
 * # of non-origin
 * Classification of non-origin links
 * # of other Objects in Webpage
 * JSON/CSV
 * **/

const analyzeHarFile = async (file,services) => {
    try{
        // console.log("Parsing File ",file)
        const content     = {}
        const allLinks    = []
        const contentFirstParty = {}
        const LinksFirstParty = []
        const JSLinks_nonOrigin = []
        const JSLinks_sameOrigin = []

        let dict = {
            website: file,
            totalJSFiles:0,
            sameOriginJS:0,
            nonOriginJS:0,
            jsClassification:{},
            // otherObjects:{}, 
            sameOriginLinks:[], 
        };

        tree = await readFile(file);
        var tokens = JSON.parse(tree);

        parseHar(tokens,content,allLinks,contentFirstParty,LinksFirstParty,JSLinks_sameOrigin,JSLinks_nonOrigin);
        jsSer = identifyServices(services,JSLinks_nonOrigin);

        let classifiedJS = jsSer;
        dict.totalJSFiles = JSLinks_nonOrigin.length+JSLinks_sameOrigin.length;
        dict.sameOriginJS = JSLinks_sameOrigin.length;
        dict.nonOriginJS  = JSLinks_nonOrigin.length;
        dict.jsClassification = classifiedJS;
        // dict.otherObjects = content;
        dict.sameOriginLinks = JSLinks_sameOrigin;
        return dict;
    } catch(err){
        console.log(err)
    }    
}

//Download the File, parse, tokenize and categorize it!
/** Returns Following:
 * # of variables
 * # of URLs and their types
 * # of Function Declarations
 * Tokens and their appearance number
*/
const analyzeJSFile = async (webpage,link,type,dir) => {
    try{
        let diction = {
            variableDec: 0,
            identifiers: {},
            literals : [],
            funcDec : 0
        };
        let fileName = link.split("/")[ link.split("/").length-1 ];
        if (!fs.existsSync(path.join(dir,webpage,type))){
            fs.mkdirSync(path.join(dir,webpage,type),{ recursive: true });
        }
        await downloadJS(path.join(dir,webpage,type,fileName.substr(1,20)),link);
        let tree = await getTree(await readFile(path.join(dir,webpage,type,fileName.substr(1,20))));
        getIdentifiers(tree,diction);

        var tokens = JSON.parse(await readFile("tokens.json"));
        Object.keys(diction.identifiers).forEach(a => {
            findObj(tokens,a,diction.identifiers[a]);
        })

        allUrls = getAllStringLiterals(tree).filter(a => isURL(a));

        let dict = {
            website: webpage, 
            jsType: type,
            numOfVar: 0,
            numOfFunc: 0,
            numOfURL: 0,
            URLtypes: {},
            identifiers: {},
            fileSize : 0
        };

        dict.numOfVar = findNumOfVariables(tree);
        dict.numOfFunc = findNumOfFunctions(tree);
        dict.numOfURL = allUrls.length;
        dict.URLtypes = sepLinks(allUrls);
        dict.identifiers = tokens;
        dict.fileSize = getFileSize(path.join(dir,webpage,type,fileName.substr(1,20)));
        return dict;
    } catch(_) {
    } 
}


//Convert JS Dict to headersJS Format
const convertHeadersFormat = (dict) => {
    let newDict = {}
    Object.keys(dict).forEach(a => {
        if(a === "URLtypes"){
            Object.keys(dict[a]).forEach(k => {
                newDict[k] = Object.keys(dict[a][k]).reduce( (previous, key) => {
                                return previous + dict[a][k][key].length;
                            }, 0);
            })
        }  else if(a === "identifiers"){
            Object.keys(dict[a]).forEach(k => {
                let num = 0;
                num = Object.keys(dict[a][k]).reduce((prev, q) => {
                    newDict[q] = Object.keys(dict[a][k][q]).reduce( (prev,cur) => {
                        return prev + parseInt(dict[a][k][q][cur]);
                    },0);
                    return prev +  newDict[q];
                },0)
                newDict[k] = num;
            })
        } else {
            newDict[a] = dict[a];
        }
    })
    return newDict;
}
// Headers for HAR files
let headers1 = [
    {id:"website",title:"website"},
    {id:"totalJSFiles",title:"totalJSFiles"},
    {id:"sameOriginJS",title:"sameOriginJS"},
    {id:"nonOriginJS",title:"nonOriginJS"},
    // {id:"html",title:"html"},
    // {id:"css",title:"css"},
    // {id:"image",title:"image"},
    // {id:"other",title:"other"},
    {id:"ad",title:"ad"},
    {id:"analytics",title:"analytics"},
    {id:"social",title:"social"},
    {id:"library",title:"library"},
    {id:"utility",title:"utility"},
    {id:"tag-manager",title:"tag-manager"},
    {id:"video",title:"video"},
    {id:"hosting",title:"hosting"},
    {id:"content",title:"content"},
    {id:"Other",title:"Other"},
];

//Headers for JS files
let headers2 = [
    {id:"website",title:"website"},
    {id:"fileSize",title:"fileSize"},
    {id:"jsType",title:"jsType"},
    {id:"numOfVar",title:"numOfVar"},
    {id:"numOfFunc",title:"numOfFunc"},
    {id:"numOfURL",title:"numOfURL"},
    {id:"Image",title:"Image"},
    {id:"Script",title:"Script"},
    {id:"CSS",title:"CSS"},
    {id:"HTML",title:"HTML"},
    {id:"Others",title:"Others"},
    {id:"BrowserBOM",title: "BrowserBOM"},
    {id:"DOM",title: "DOM"},
    {id:"File_API",title: "File_API"},
    {id:"ImageData",title: "ImageData"},
    {id:"Images",title: "Images"},
    {id:"IndexedDB",title: "IndexedDB"},
    {id:"Window",title: "Window"},
    {id:"Video",title: "Video"},
    {id:"StyleSheet",title: "StyleSheet"},
    {id:"PerformanceTiming",title: "PerformanceTiming"},
    {id:"LoadingResource",title: "LoadingResource"},
    {id:"XML_HTPP_Request",title:"XML_HTPP_REQUEST"},
    {id:"RegularExpressions", title:"RegularExpressions"},
    {id:"CryptoCurrency",title:"CryptoCurrency"},
    {id:"Canvas_API",title:"Canvas_API"},
    {id:"Constructor",title:"Constructor"},
    {id:"Cookie",title:"Cookie"},
    {id:"CSS",title:"CSS"},
    {id:"document",title:"document"},
    {id:"downlaod",title:"downlaod"},
    {id:"elements",title:"elements"},
    {id:"Event_Handlers",title:"Event_Handlers"},
    {id:"events",title:"events"},
    {id:"Events",title:"Events"},
    {id:"Forms",title:"Forms"},
    {id:"History",title:"History"},
    {id:"Inheritance",title:"Inheritance"},
    {id:"Interfaces",title:"Interfaces"},
    {id:"Location",title:"Location"},
    {id:"Methods",title:"Methods"},
    {id:"methods",title:"methods"},
    {id:"Navigation",title:"Navigation"},
    {id:"Navigator",title:"Navigator"},
    {id:"Node",title:"Node"},
    {id:"Other",title:"Other"},
    {id:"Popup",title:"Popup"},
    {id:"Properties",title:"Properties"},
    {id:"properties",title:"properties"},
    {id:"Related",title:"Related"},
    {id:"Screen",title:"Screen"},
    {id:"Timing",title:"Timing"},
    {id:"Type",title:"Type"},
    {id:"type",title:"type"},
    {id:"Window",title:"Window"},
    {id:"regularExpressions",title:"regularExpressions"},
    {id:"Mining", title:"Mining"}
];

//Write data in CSV File
const writeToCSV = async (data, filename,headers) => {       
    const csvWriter = createCsvWriter({  
        path: filename,
        header: headers
      });
    let dataToInsert = [];
    data.forEach(item => {
        let eachItem = {}
        Object.keys(item).forEach(key => {
            try{
                if( item[key] instanceof Object) {
                    Object.keys(item[key]).forEach(a => {
                        // eachItem[a] = item[key][a].length;
                        if(Array.isArray(item[key][a])){
                            eachItem[a] = item[key][a].length;
                        } else {
                            eachItem[a] = item[key][a];
                        }
                    })
                } else if(Array.isArray(item[key])){
                    eachItem[key] = item[key].length;
                } else {
                    eachItem[key] = item[key];
                }
            } catch(err){
                console.log(err)
            }
        })
        dataToInsert.push(eachItem);
    })
    csvWriter  
    .writeRecords(dataToInsert)
    .then(()=> console.log(`The CSV file ${filename} was written successfully`));
}

//Run this file and do everything!...
const runMe = async () => {
    try{
        const args = process.argv;
        if (args.length < 2) {
            console.log("Error: node parseHar.js directory")
        }
        const dirName = args[2];
        let harFiles = [];
        harFiles =  readDir(dirName);
        console.log(harFiles)
        const services = JSservices(await readFile("jsServices.json"))
        services["Other"] = []

        allFilesData = []
        allJSFilesData = []
        await Promise.all( harFiles.map(async (file) => {
            try{
                const dict = await analyzeHarFile(file,services);
                allFilesData.push(dict);
                await Promise.all( dict.sameOriginLinks.map(async link => {
                    try{
                        const ans = await analyzeJSFile(file,link,"sameOrigin","./dummy")
                        allJSFilesData.push(convertHeadersFormat(ans));
                    } catch(_){

                    }
                }))
                await Promise.all( Object.keys(dict.jsClassification).map(async key => {
                    await Promise.all( dict.jsClassification[key].map(async link => {
                        const ans = await analyzeJSFile(file,link,key,"./dummy")
                        // console.log(ans)
                        allJSFilesData.push(convertHeadersFormat(ans));
                    }))
                }))
            } catch(err){
                console.log(err)
            }

        }))

        console.log("Writing Results to the file results.csv")
        // await writeFile("results.JSON", JSON.stringify(allFilesData));
        await writeToCSV(allFilesData,"results.csv",headers1)
        console.log("Writing Results to the file resultsjsFiles.csv")
        await writeToCSV(allJSFilesData,"resultsjsFiles.csv",headers2)
    } catch(err){
        console.log(err)
    }
}


runMe();
