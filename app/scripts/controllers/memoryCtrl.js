(function () {
    'use strict';

    angular
        .module('angularMemoryApp')
        .controller('MemoryController', MemoryController);

    MemoryController.$inject = ['$timeout', 'localstorage'];

    function MemoryController($timeout, localstorage) {
        /* jshint validthis: true */
        var self = this;

        self.allBtns = [];

        var numberOfDifferentPics = 8;
        var numberOfPics = numberOfDifferentPics * 2;
        var numberOfRowsAndCols = numberOfDifferentPics / 2;

        var privateAPI = {
            pressedBtn: {name: undefined},
            checking: {name: undefined},
            foundBoth: {},
            addBtns: _addBtns,
            createMatrix: _createMatrix
        };

        self.clicks = 0;
        self.topscore = localstorage.topscore;
        self.foundBoth = foundBoth;
        self.toggleBtn = toggleBtn;
        self.showMe = showMe;
        self



        privateAPI.addBtns();
        privateAPI.createMatrix();

        function showMe(nameOfBtn, btnId){
            return self.foundBoth(nameOfBtn) ||
            (nameOfBtn === privateAPI.pressedBtn.name && btnId === privateAPI.pressedBtn.btnId) ||
                (nameOfBtn === privateAPI.checking.name && btnId === privateAPI.checking.btnId);
        }

        function foundBoth(nameOfBtn){
            return privateAPI.foundBoth[nameOfBtn] && privateAPI.foundBoth[nameOfBtn] === true;
        }

        function toggleBtn(nameOfBtn, btnId){
            self.clicks++;
            privateAPI.checking.name = nameOfBtn;
            privateAPI.checking.btnId = btnId;
            if(angular.isUndefined(privateAPI.pressedBtn.name)){
                privateAPI.pressedBtn.name = nameOfBtn;
                privateAPI.pressedBtn.btnId = btnId;
            }
            else if(nameOfBtn === privateAPI.pressedBtn.name && btnId !== privateAPI.pressedBtn.btnId){
                privateAPI.foundBoth[nameOfBtn] = true;
                privateAPI.pressedBtn.name = undefined;
                privateAPI.pressedBtn.btnId = undefined;
            }
            else{
                $timeout(function () {
                    privateAPI.pressedBtn.name = undefined;
                    privateAPI.pressedBtn.btnId = undefined;
                    privateAPI.checking.name = undefined;
                    privateAPI.checking.btnId = undefined;
                }, 1000);
            }

        }

        function _addBtns() {
            var numberArr = [];
            for (var i = 0; i < 16; i++) {
                numberArr.push(i);
            }

            var imgNum = 1;
            var oneAdded = false;
            for (var j = 0; j < numberOfPics; j++) {
                var pos = numberArr.splice(Math.random() * numberArr.length, 1);
                self.allBtns.splice(pos, 0, {id: j, imgName: 'images/rolig' + imgNum + '.jpeg'});
                if (oneAdded) {
                    imgNum++;
                }
                oneAdded = !oneAdded;

            }

        }

        function _createMatrix() {
            self.rows = [];
            var btnIndex = 0;
            for (var row = 0; row < numberOfRowsAndCols; row++) {
                var aCol = [];
                for (var col = 0; col < numberOfRowsAndCols; col++) {
                    aCol.push(self.allBtns[btnIndex++]);
                }
                self.rows.push(aCol);
            }
        }


    }
})();
