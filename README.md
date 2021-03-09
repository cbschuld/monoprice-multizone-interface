# Monoprice Multizone Amp WebApp Interface

This is a React JS app written in TypeScript that provides a web-based interface to control the [six channel multi-zone amplifier from Monoprice](https://www.monoprice.com/product?p_id=10761) via a JSON API on a [Raspberry Pi](https://amzn.to/2Xk58og).

This project provides just the web application.  You will need to have the JSON API project running already before you use this application.  You can get more information about that API [via this walk-through](https://chrisschuld.com/2019/07/decorating-the-monoprice-6-zone-home-audio-multizone-controller/) (API is hosted via github here - [https://github.com/jnewland/mpr-6zhmaut-api](https://github.com/jnewland/mpr-6zhmaut-api)).


<img src="https://s3-us-west-2.amazonaws.com/chrisschuld.com/images/iphone-render-house-audio.png" style="width:400px;"/>

## What do I need?

You need the following things for this app to work:
+ The [six channel multi-zone amplifier from Monoprice](https://www.monoprice.com/product?p_id=10761)
+ Serial cable to USB-A - this one works GREAT *(and this can be tricky to get one with correct functionality)*: [USB 2.0 to RS232 DB9 Serial Cable Male A Converter Adapter with PL2303 Chipset](https://amzn.to/2ypmceB)
+ Raspberry pi or a [Raspberry Pi Starter Kit - everything you need](https://amzn.to/33cXPz4)
+ Jesse Newland's API - [via this walk-through](https://chrisschuld.com/2019/07/decorating-the-monoprice-6-zone-home-audio-multizone-controller/)
+ This WebApp (keep reading...)

## Installing and Using the Web App

### Clone the Repo

To get started you need to put the TypeScript React app on your local machine (or on the raspberry pi).  Also, you need to make sure you have the latest version of `npm` installed on your machine.

*notes: move your change directory to your project directly*

```bash
cd /projects
git clone https://github.com/cbschuld/monoprice-multizone-interface.git
cd monoprice-multizone-interface
npm install
```

### Adjust the Environment

There is file in the root path called `env.sample.tsx` *(in the `src` folder)*.  You will need to copy this file over as `env.tsx` and adjust this file to match your amplifier/controller setup before you go to the next step.  You will see in there that you can use custom icons for each zone/room.  I have included what I use in my sample image to help your setup.

### Build the App

Now that your environment is updated you can build the App to get ready to ship it to the Raspberry Pi (where your API is located most likely).  Staying on the same machine run the following.

```bash
npm build
```

### Raspberry Pi - Installing the React App

Next, on the Raspberry Pi run the following commands to install nginx

```bash
sudo apt-get update
sudo apt-get install nginx
sudo chown -R pi:root /var/www/html
```

Wherever you ran the `npm build` command you will now see a `build` directory.  Copy that directory to the `/var/www/html` path on the Raspberry Pi.  In my case I built it on my local development machine and just used `scp` to copy the build directoy to the Pi.  *(Note: my Raspberry Pi is located at 10.0.0.82)*

```bash
cd /projects/monoprice-multizone-interface
scp -r * pi@10.0.0.82:/var/www/html/
```

### View the App

That is all it takes to use this application; if you point your browser to the IP address of the Raspberry Pi you'll see the App!

## Contributions

* fork
* create a feature branch
* open a Pull Request
