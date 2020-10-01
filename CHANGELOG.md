# [2.8.0](https://github.com/bconnorwhite/bob/compare/v2.7.0...v2.8.0) (2020-10-01)


### Bug Fixes

* also check git tags before bumping version ([7d79c62](https://github.com/bconnorwhite/bob/commit/7d79c62700b0a8d509c2bc48c22424524ac6ca6c))
* clean up prerelease output ([a631c55](https://github.com/bconnorwhite/bob/commit/a631c551f5280669f2fcd7e32fc6afb380a2d3f3))
* default release script to publish ([139ac65](https://github.com/bconnorwhite/bob/commit/139ac6532391b3e65444ba10073f6673d035ddc4))
* fix init readme command naming issue ([967b865](https://github.com/bconnorwhite/bob/commit/967b865b5c7897731d771e5b22c8c0fc09345468))
* fix issue setting coveralls token in release ([60700a4](https://github.com/bconnorwhite/bob/commit/60700a4593ca4305bad5c3fc5aebc779074c4f07))
* fix warning message in release output ([046eaa7](https://github.com/bconnorwhite/bob/commit/046eaa79165861f9da449d032a3c5bb52b2916e8))
* reorder imports in test init ([6425152](https://github.com/bconnorwhite/bob/commit/6425152cdd6f06e16c5974d9cab39c27d4e7a2d9))
* set upstream during push if necessary ([e72612c](https://github.com/bconnorwhite/bob/commit/e72612c0c785618d365da1baeda2cf843ea8daea))
* use actions in prerelease for better output ([9a9de15](https://github.com/bconnorwhite/bob/commit/9a9de15c66f23b2c7549ad000867cee6ff834beb))


### Features

* added update commands ([6215152](https://github.com/bconnorwhite/bob/commit/6215152f16e017ae2e97015c571aaf26a60deff7))



# [2.7.0](https://github.com/bconnorwhite/bob/compare/v2.6.3...v2.7.0) (2020-09-30)


### Bug Fixes

* add quotes to lint source output ([80013c7](https://github.com/bconnorwhite/bob/commit/80013c75eda11000d25ab09753cab6ee6e46002b))
* add support for publishing from yarn and pnpm ([5c89a80](https://github.com/bconnorwhite/bob/commit/5c89a801331141f834957d182769baf5fa67c3aa))
* added spinner for test command ([ab89d40](https://github.com/bconnorwhite/bob/commit/ab89d409db27c08465d68dc3a5df1b527a82ed56))
* adjust build spinner output text ([abebb71](https://github.com/bconnorwhite/bob/commit/abebb71c8a3f26099d2ed8fa42cd73ce9af1e697))
* allow lint commit without husky env being set ([c553c1e](https://github.com/bconnorwhite/bob/commit/c553c1eaedaacc60cb1264f214d8b3ac2129bfe5))
* fix husky commit-msg command ([a838a87](https://github.com/bconnorwhite/bob/commit/a838a871d622f0df7e9639089d28636f7d055352))
* fix issue with sending coverage to Coveralls ([29c6ff6](https://github.com/bconnorwhite/bob/commit/29c6ff6955aa23529eb2fe9b41a1485e605c807a))
* fix package json lint rules ([1db8c5e](https://github.com/bconnorwhite/bob/commit/1db8c5e61743c05b78dc4ce4311b837cffd7aa05))
* fix to pushing tags ([626fc8c](https://github.com/bconnorwhite/bob/commit/626fc8ce90e16bf1c9772b8e96e15061d8761500))


### Features

* add editorconfig ([4488ac5](https://github.com/bconnorwhite/bob/commit/4488ac527b7414f9b0050213b07a4e6f5183d3d6))
* added init test command ([a5fb90d](https://github.com/bconnorwhite/bob/commit/a5fb90d289f4b12d42ca7995bd03f2589fc33407))
* lint test command ([1b67f38](https://github.com/bconnorwhite/bob/commit/1b67f38e34454505e0cc92c5fc6b2a1219cad93e))



## [2.6.3](https://github.com/bconnorwhite/bob/compare/v2.6.2...v2.6.3) (2020-09-27)


### Bug Fixes

* catch error from version exists ([60026b6](https://github.com/bconnorwhite/bob/commit/60026b69f4d184ecca7b534389305d980b271e72))
* fix version error on release ([4b3e796](https://github.com/bconnorwhite/bob/commit/4b3e7962a21735c00db84a23eed0198204d79e0e))
* remove extra newline when initializing gitignore ([a7f674d](https://github.com/bconnorwhite/bob/commit/a7f674de9e365be13d3d7eca8b4aef405817c595))



## [2.6.2](https://github.com/bconnorwhite/bob/compare/v2.6.1...v2.6.2) (2020-09-27)


### Bug Fixes

* check if version exists before bumping ([2be985e](https://github.com/bconnorwhite/bob/commit/2be985ed00266a7da3ccf44b8bd03429b1c5f266))



## [2.6.1](https://github.com/bconnorwhite/bob/compare/v2.6.0...v2.6.1) (2020-09-27)


### Bug Fixes

* fix missing newlines in readme init ([7a9c42f](https://github.com/bconnorwhite/bob/commit/7a9c42f8794ce404766d3dfaf7f0a1293c66309b))
* init github after git init ([23750a4](https://github.com/bconnorwhite/bob/commit/23750a4364a8a3ee9c8df7fa0fddc43d94f1271f))
* log errors from coveralls release ([1691155](https://github.com/bconnorwhite/bob/commit/16911559c043376a9515b476feb6082994c947fa))



# [2.6.0](https://github.com/bconnorwhite/bob/compare/v2.5.2...v2.6.0) (2020-09-27)


### Bug Fixes

* add test as a typescript rootDir ([fd3b071](https://github.com/bconnorwhite/bob/commit/fd3b07135ec49a36bf8221bac2d20b1305db03be))
* fix coveralls init issue ([7047396](https://github.com/bconnorwhite/bob/commit/70473963db27d7154ddf80ffef3ad8a32398f11a))
* readme init update ([b83cf8f](https://github.com/bconnorwhite/bob/commit/b83cf8fe67f3cd9c56ae7c3b049d617f6674cc3b))
* tsconfig rootDir issue ([f31aa60](https://github.com/bconnorwhite/bob/commit/f31aa60e210f02f47d6fbc0268450d1f5fde619f))


### Features

* add remote origin on GitHub init ([920b74b](https://github.com/bconnorwhite/bob/commit/920b74b0c1dc64e5157dab1bc15fdefd6e6ff125))
* coveralls init ([8fae0aa](https://github.com/bconnorwhite/bob/commit/8fae0aa8c51128a7d64e66cd2a314cda9adb0cf3))
* prerelease command ([09338ed](https://github.com/bconnorwhite/bob/commit/09338edc09baa1981b6302d6700532a150a0b870))
* publish command ([2835f33](https://github.com/bconnorwhite/bob/commit/2835f3337055cda7e2b19b9dafd6ef04936f21b5))
* release command ([006fb80](https://github.com/bconnorwhite/bob/commit/006fb80cc286f649c7c16db5c4da49be3e704486))
* save twitterHandle to configstore ([ab8a6bf](https://github.com/bconnorwhite/bob/commit/ab8a6bfe13253a01cad7ec9198d6ef97e4508cb8))
* star GitHub repo for good luck ([1e27b20](https://github.com/bconnorwhite/bob/commit/1e27b20f7e3803c01f0eff727678f55603ea520b))



## [2.5.2](https://github.com/bconnorwhite/bob/compare/v2.5.1...v2.5.2) (2020-09-26)


### Bug Fixes

* issue with init in repo without org ([04ac552](https://github.com/bconnorwhite/bob/commit/04ac5529c88882e801836b0c67d91fb607de9283))



## [2.5.1](https://github.com/bconnorwhite/bob/compare/v2.5.0...v2.5.1) (2020-09-26)


### Bug Fixes

* fix init prompt issues ([e78c0a6](https://github.com/bconnorwhite/bob/commit/e78c0a6a7a48e9814aff5b1133f721b88866d530))



# [2.5.0](https://github.com/bconnorwhite/bob/compare/v2.4.2...v2.5.0) (2020-09-26)


### Bug Fixes

* add .env to gitignore init ([ab5bcf6](https://github.com/bconnorwhite/bob/commit/ab5bcf6e9237a13b7b9265ce25ddc5b77e72b70b))
* fix declaration output path ([aded3b5](https://github.com/bconnorwhite/bob/commit/aded3b5b34a7b02561313b5845e45792287fa3a1))
* lint commit env fix ([15de40c](https://github.com/bconnorwhite/bob/commit/15de40c4ccd77aeb54a83da7b1de705aef0f50f0))
* set rootDir in tsconfig ([f03d8a0](https://github.com/bconnorwhite/bob/commit/f03d8a05a758d3645fac2cb71527ea98e797cae7))
* support babel class properties ([8e7e8b3](https://github.com/bconnorwhite/bob/commit/8e7e8b332284f74e4ec5f6cb2a5603defb86afd7))
* update structure ([5156ea9](https://github.com/bconnorwhite/bob/commit/5156ea9ea6a4646b2080d547a3db0e751e3d012e))


### Features

* add lint commit command ([0c27cd4](https://github.com/bconnorwhite/bob/commit/0c27cd448074ac2b78860d421f6f5cef3373d595))
* allow types as type root directory ([4926983](https://github.com/bconnorwhite/bob/commit/492698359ad6986290c9b800688586ffd8cf5425))
* commit command ([c122430](https://github.com/bconnorwhite/bob/commit/c1224305263a8c5129a53dcce3e91788234b9332))
* github init ([80bd57c](https://github.com/bconnorwhite/bob/commit/80bd57c60ef9d54c28ebbc92f46159f4941b4d9b))
* lint commit messages with husky ([4bc2b05](https://github.com/bconnorwhite/bob/commit/4bc2b054e4fb3daf9249636b0b5c26342188cbb9))
* save package.json init to configstore ([2dd62ee](https://github.com/bconnorwhite/bob/commit/2dd62ee73219e750c17db0955c3d054acdd64469))
* test command ([00cf7fc](https://github.com/bconnorwhite/bob/commit/00cf7fc9f6f29c58c2238242809b6e426575eb8b))
* use github top languages in README init ([7f95b5a](https://github.com/bconnorwhite/bob/commit/7f95b5a105855acf375d3b3d4036e4af069575eb))



## [2.4.2](https://github.com/bconnorwhite/bob/compare/v2.4.1...v2.4.2) (2020-09-23)


### Bug Fixes

* include .cz.json ([94d33e0](https://github.com/bconnorwhite/bob/commit/94d33e0cf11b730fb9cef5ecd6d7b6e43c767ff0))



## [2.4.1](https://github.com/bconnorwhite/bob/compare/v2.4.0...v2.4.1) (2020-09-23)


### Bug Fixes

* remove .cz.json after commit ([829fa82](https://github.com/bconnorwhite/bob/commit/829fa82a13853e1c1fa826cb67aaf6d4869724b4))
* update lint rules ([e8704b9](https://github.com/bconnorwhite/bob/commit/e8704b91513fff3ee1a5f7ef615c59eaa363bfac))
* update yarn.lock ([05dd1d2](https://github.com/bconnorwhite/bob/commit/05dd1d2e8207b6e81b457942b6915eab15081895))



# [2.4.0](https://github.com/bconnorwhite/bob/compare/v2.3.1...v2.4.0) (2020-09-22)


### Features

* added commit command ([0990536](https://github.com/bconnorwhite/bob/commit/0990536c3dba4228e2e163e639f2559a3eeaf8b9))



## [2.3.1](https://github.com/bconnorwhite/bob/compare/v2.3.0...v2.3.1) (2020-09-20)


### Bug Fixes

* dependency bump ([153ce6c](https://github.com/bconnorwhite/bob/commit/153ce6c82e3e0ca67ce540bf96efececf53ae771))



# [2.3.0](https://github.com/bconnorwhite/bob/compare/v2.2.1...v2.3.0) (2020-09-20)


### Features

* add lint command ([7db1832](https://github.com/bconnorwhite/bob/commit/7db1832f76f4b9c407cdd268b41f916e846666d7))



## [2.2.1](https://github.com/bconnorwhite/bob/compare/v2.2.0...v2.2.1) (2020-09-20)



# [2.2.0](https://github.com/bconnorwhite/bob/compare/v2.1.3...v2.2.0) (2020-09-20)



## [2.1.3](https://github.com/bconnorwhite/bob/compare/v2.1.2...v2.1.3) (2020-09-20)


### Bug Fixes

* tsconfig updates ([2f2c381](https://github.com/bconnorwhite/bob/commit/2f2c381f0b352b06ae741e0bbfe195ec20a2dbf7))
* type fix ([e59f407](https://github.com/bconnorwhite/bob/commit/e59f407c806aad7954cfa410e6f0a85f0da6d8cd))



## [2.1.2](https://github.com/bconnorwhite/bob/compare/v2.1.0...v2.1.2) (2020-09-20)


### Bug Fixes

* bump commander-version ([3757a36](https://github.com/bconnorwhite/bob/commit/3757a36d2f68a1652dcb4c4209b1290957f4240c))
* don't remove type declaration comments ([4b71d25](https://github.com/bconnorwhite/bob/commit/4b71d250d75d839d0214e2fd03a3bc66c498ea6e))
* README generation spacing ([8f025b1](https://github.com/bconnorwhite/bob/commit/8f025b165ec903cf18cf190d17326326974e7c14))
* switch README language to typescript ([d3f7960](https://github.com/bconnorwhite/bob/commit/d3f7960fc94a3394b0e7b4b55ddcb3303377fafe))
* switch to commander-version ([4754f37](https://github.com/bconnorwhite/bob/commit/4754f3727d5bc61dc98eb2dbdd8ce5d185428091))
* tsconfig types ([cb52477](https://github.com/bconnorwhite/bob/commit/cb5247774cff357deb022bdfdb7ba98db41629ad))
* type update ([e0224d8](https://github.com/bconnorwhite/bob/commit/e0224d8a47b4dcb222c6a6e5813a3a9ecc3fef83))
* update build output ([e51e203](https://github.com/bconnorwhite/bob/commit/e51e2032fea673fa4d295a5a841af50af3fc0b97))
* update types ([ed63d37](https://github.com/bconnorwhite/bob/commit/ed63d37f59519a298af0dfc5960560c4fb47a34f))
* use countAction instead of count ([ed5d3da](https://github.com/bconnorwhite/bob/commit/ed5d3da168e1b06981254a0fb84c871c5530c572))


### Features

* init gitignore with .DS_Store ([0959c51](https://github.com/bconnorwhite/bob/commit/0959c5123054e1a07bb42c08c0d7ba10732dac37))



# [2.1.0](https://github.com/bconnorwhite/bob/compare/v2.0.1...v2.1.0) (2020-09-20)


### Bug Fixes

* package json init fixes ([1c51a38](https://github.com/bconnorwhite/bob/commit/1c51a38aa85cd262a8c5b75e915b9607eda586fc))
* switch to live tsconfig.json file ([1d6a1cb](https://github.com/bconnorwhite/bob/commit/1d6a1cb1ad632bc43a95c6f84c031317d7ba66ef))
* update init description ([abbaf94](https://github.com/bconnorwhite/bob/commit/abbaf94515cfcb1bd4f3399d32cd313f105ae0a7))


### Features

* git init ([9f157f5](https://github.com/bconnorwhite/bob/commit/9f157f57f3e1f6452db6cf75ada3e0b73b9bdf42))
* init README, init tsconfig, git init only if not already a git repo ([092ede2](https://github.com/bconnorwhite/bob/commit/092ede2835b58ad461df3305b39b4909b63b9fe9))



## [2.0.1](https://github.com/bconnorwhite/bob/compare/v2.0.0...v2.0.1) (2020-09-20)



# [2.0.0](https://github.com/bconnorwhite/bob/compare/v1.9.7...v2.0.0) (2020-09-20)


### Features

* silent and debug flags ([f45fa62](https://github.com/bconnorwhite/bob/commit/f45fa628bfbb131a23ea892af2027060fb419b0a))



## [1.9.7](https://github.com/bconnorwhite/bob/compare/v1.9.6...v1.9.7) (2020-09-02)



## [1.9.6](https://github.com/bconnorwhite/bob/compare/v1.9.5...v1.9.6) (2020-09-02)



## [1.9.5](https://github.com/bconnorwhite/bob/compare/v1.9.4...v1.9.5) (2020-08-24)



## [1.9.4](https://github.com/bconnorwhite/bob/compare/v1.9.3...v1.9.4) (2020-08-22)



## [1.9.3](https://github.com/bconnorwhite/bob/compare/v1.9.2...v1.9.3) (2020-08-18)



## [1.9.2](https://github.com/bconnorwhite/bob/compare/v1.9.1...v1.9.2) (2020-08-18)



## [1.9.1](https://github.com/bconnorwhite/bob/compare/v1.9.0...v1.9.1) (2020-08-18)



# [1.9.0](https://github.com/bconnorwhite/bob/compare/v1.8.0...v1.9.0) (2020-08-18)



# [1.8.0](https://github.com/bconnorwhite/bob/compare/v1.7.7...v1.8.0) (2020-08-13)



## [1.7.7](https://github.com/bconnorwhite/bob/compare/v1.7.6...v1.7.7) (2020-08-12)



## [1.7.6](https://github.com/bconnorwhite/bob/compare/v1.7.5...v1.7.6) (2020-08-10)



## [1.7.5](https://github.com/bconnorwhite/bob/compare/v1.7.4...v1.7.5) (2020-08-10)



## [1.7.4](https://github.com/bconnorwhite/bob/compare/v1.7.3...v1.7.4) (2020-08-10)



## [1.7.3](https://github.com/bconnorwhite/bob/compare/v1.7.2...v1.7.3) (2020-08-10)



## [1.7.2](https://github.com/bconnorwhite/bob/compare/v1.7.1...v1.7.2) (2020-08-10)



## [1.7.1](https://github.com/bconnorwhite/bob/compare/v1.7.0...v1.7.1) (2020-08-10)



# [1.7.0](https://github.com/bconnorwhite/bob/compare/v1.6.0...v1.7.0) (2020-08-10)



# [1.6.0](https://github.com/bconnorwhite/bob/compare/v1.5.2...v1.6.0) (2020-08-09)



## [1.5.2](https://github.com/bconnorwhite/bob/compare/v1.5.1...v1.5.2) (2020-08-08)



## [1.5.1](https://github.com/bconnorwhite/bob/compare/v1.5.0...v1.5.1) (2020-08-08)



# [1.5.0](https://github.com/bconnorwhite/bob/compare/v1.4.3...v1.5.0) (2020-08-07)



## 1.4.3 (2020-07-26)



