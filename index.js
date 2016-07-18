'use strict';
var co_fs = require('co-fs')
var fs = require('fs')
var xlsx = require('node-xlsx')
var co = require('co')
var csv = require('csv-parse/lib/sync')
var _ = require('co-lodash')
var tsv = require("node-tsv-json")
var parser = require('xml2json')
var jsonexport = require('jsonexport')
var exec = require('child_process').exec
var randomstring = require("randomstring")

var Excel = function(){

	this.readDirectory = co.wrap(function*(directory){
		var self = this
		var sourcesData = []
		var files = yield co_fs.readdir(directory)
		yield* _.coEach(files,function*(file){
			var full_path = directory+"/"+file
			var sheet = yield self.readFile(full_path)
			sourcesData.push(sheet)
		})
		return Promise.resolve(sourcesData)
	})

	this.readFile = co.wrap(function*(file){
		var re = new RegExp(".*\\/(.*)\\.","i")
		var fileName = (file.match(re)) ? file.match(re)[1] : file
		if(this.isExcel(file)){
			var sourceData = []
			var sheets = xlsx.parse(yield co_fs.readFile(file))
			sheets.some(function(sheet){ sourceData.push(sheet) })
			return Promise.resolve(sourceData)
		} else if(this.isCsv(file)){
			var fileData = yield co_fs.readFile(file)
			try{
				sourceData = [{
					'name':'Hoja1',
					'fileName':fileName,
					'filePath':file,
					'data': yield csv(fileData,{relax_column_count:true})
				}]
			} catch(e){ console.log(e) }
			return Promise.resolve(sourceData)
		} else if(this.isTsv(file)){
			var tsvData = yield this.parseTsv(file)
			sourceData = [{
				'name':'Hoja1',
				'fileName':fileName,
				'filePath':file,
				'data': tsvData
			}]
			return Promise.resolve(sourceData)
		} else if(this.isXml(file)){
			var csvData = yield this.parseXml2Csv(file)
			var jsonData = yield csv(csvData,{relax_column_count:true})
			sourceData = [{
				'name':'Hoja1',
				'fileName':fileName,
				'filePath':file,
				'data': jsonData
			}]
			return Promise.resolve(sourceData)
		}
		return Promise.resolve(null)
	})

	this.parseXml2Csv = function(file){
    return new Promise(function(resolve, reject){
			var randomId = randomstring.generate(7)
			var filePath = '/tmp/'+randomId+'.xml'
			exec('xsltproc '+__dirname+'/xslt/removeSoap.xsl "'+file+'"', (error, stdout, stderr) => {
				fs.writeFile(filePath, `${stdout}`, (err) => {
					exec('xsltproc '+__dirname+'/xslt/CR1toCSV.xsl "'+filePath+'"', (error, csvData, stderr) => {
						fs.unlink(filePath, (err) => {
							if (err) throw err
							resolve(csvData)
						})
					})
				})
			})

    })
  }

	this.parseTsv = function(file){
		return new Promise(function(resolve, reject){
			tsv({
			  input: file,
			  output: "output.json"
			  ,parseRows: true
			}, function(err, result) {
			  if(err) {
			    console.error(err)
			  }else {
			    resolve(result)
			  }
			})
		})
	}

	this.isExcel = function(filePath){
		return filePath.indexOf('.xls') != -1
	}

	this.isCsv = function(filePath){
		return filePath.indexOf('.csv') != -1
	}

	this.isTsv = function(filePath){
		return filePath.indexOf('.tsv') != -1
	}

	this.isXml = function(filePath){
		return filePath.indexOf('.xml') != -1
	}

}

module.exports = Excel;
