# MMM-Skolmaten
A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that shows school lunch menus in Sweden from webmenu.foodit.se.

# Installation
1. Clone repo:
```
	cd MagicMirror/modules/
	git clone https://github.com/matst80/MMM-FaluSkolMat
```
2. Install dependencies:
```
	cd MMM-FaluSkolMat/
	npm install
```
3. Add the module to the ../MagicMirror/config/config.js, example:
```
		{
			module: 'MMM-FaluSkolMat',
			header: 'Någon skola i falun',
			position: 'bottom_right',
			config: {
				url: 'https://webmenu.foodit.se/?r=20&m=2080&p=1283&c=10693&w=0&v=Week'
			}
		},
```

