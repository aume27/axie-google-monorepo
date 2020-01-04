# [Axie spreadsheet utils for google Sheets - libGSheet-Axie-Utils](https://script.google.com/d/1HspaDDZnWRfyPKZBRqIehbwHFu_5ZJgbsKkl2HM4UUeVzHS4twGU61n_/edit?usp=sharing)
---
This library was made using:
  - [Google App Script(GAS)](https://developers.google.com/apps-script/)
  - [![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
  - [:atom: Atom - Code editor](https://github.com/atom/atom) 
It allows to retrieve data from Axie infinity directly to your spreadsheet using the [libG-axie-api-wrapper](../libG-axie-api-wrapper/README.md)  . \

---
### Google app script details:
- A script that uses a library does not run as quickly as \
  single script project. Recommend to copy this code to \
  a script file in your project.
- Can't call anonym functions contained in an object from \
  spreadsheet. The Variable.functionName() structure is \
  reserved for library *IdenfierName* in googleAppScript.
- Can't send an object as function parameter from \
  spreadsheet,params must be hard coded.
- `Get` method doesn't handle payloads using UrlFetchApp, \
  *concat* `query_params` to `url`.

---
## Setup

### Step 1
First install the script as a library or make a copy of the script project.

##### As a library
1. In your googleAppScript editor, click on the menu Resources > Libraries. \
2. In the text field at the bottom of the box, enter the script ID, \
`1XQhNeKBi0ONR7_0iVM94DlQzi1Hwh8wvB_zCJxrnyiphMY_3AjudC6Qi`(this script id) \
and click the "Select" button.
3. Choose a version in the dropdown box (usually best to pick the latest version).
4. Check to see if the default *`IdenfierName`* is the one that you would like to use \
with this library. This is the name that your script uses to refer to the library. \
For example, if you set it to `Test` then you could call a method of that library \
as follows: `Test.libraryMethod()`
5. Click the "Save" button.

##### As a Standalone Script copy owned by you
Simply make a copy of the script project and rename it. \
https://script.google.com/d/1XQhNeKBi0ONR7_0iVM94DlQzi1Hwh8wvB_zCJxrnyiphMY_3AjudC6Qi/edit?usp=sharing \
*(Using this method, your copy will not be touched by changes made on the original library. \
It will be necessary to make a new copy of it if you want to update to the latest version.)*


---
#### Credits

- [pacxiu](https://github.com/pacxiu), This Google App Script is based on his api documentation \
  Axie infinity.
  Source: https://github.com/pacxiu/AxieInfinityAPI

#### Author
Guillaume MD \
[Twitter account @27aume](https://twitter.com/@27aume)

#### Donation	and feedback
- If you have any recommendation, feel free to email me directly.
- For comment about the code please add the line you're referring to.
- Your support is greatly appreciated.
		BTC:	1G2bT7cqqi1hVRn2HQ2yackqHy5aZFLboG
		ETH and ERC tokens:	0x81Be7262a55B98c5C503aB3d60A64102cC4E4B27
