var mocha = require('mocha')
var coMocha = require('co-mocha')
var assert = require('chai').assert
var Excel = require('../index')

describe('Excel', function() {
	 
	describe('#readFile()', function () {
		it('should return true when read a file XLSX succesfull',function*(){
			var test_excel = new Excel()
			var file = yield test_excel.readFile('test/xlsx/example1.xlsx')
			assert.equal(1, file.length )
		})
		it('should return true when read a file CSV succesfull',function*(){
			var test_excel = new Excel()
			var file = yield test_excel.readFile('test/csv/matriz.csv')
			assert.equal(true, file.length>0 )
		})
	})
	 
	describe('#readDirectory()', function () {
		it('should return true when read a directory with XLSX files succesfull',function*(){
			var test_excel = new Excel()
			var data = yield test_excel.readDirectory('test/xlsx')
			assert.equal(true, data.length>0)
		})
		it('should return true when read a directory with CSV files succesfull',function*(){
			var test_excel = new Excel()
			var data = yield test_excel.readDirectory('test/csv')
			assert.equal(true, data.length>0)
		})
  	})
})