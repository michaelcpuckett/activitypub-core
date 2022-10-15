# activitypub-core-lerna

This is a Lerna project that holds packages related to an implementation of the
ActivityPub protocol specification.

ActivityPub is a standardized method of exchanging social data.

## Current Status

This is a toy project at the moment. It's not fully working and it changes
frequently.

## General Philosophy

This project aims to be spec-compliant.

This project aims to be an non-opinionated as possible, providing abstracted
layers that can hopefully work with any Node.js project.

This project is MIT-licensed, with the hope it will be forked, reused, or
wholly included in other projects due to this permissive license. There may be
similiar software that exists, but inclusion would be inviable due to licensing
restrictions.

## Use Cases

There are a few use cases this project attempts to fulfill.

### Connecting a Blog to the Fediverse

Someone already has an HTML blog and a domain name and wants their posts to be
read by others and get replies. Instead of setting up a CMS, they decide to set
up an ActivityPub server.

### Single-Server Social Feeds

An exercise app that wants to build in social features to make their users
feel proud of their achievements. This would probably include something like a
notification bell and a feed where updates about their friends appear. Users
might have with the option to react with an emoji or sticker.

All these exchanges would stay local to the server, so ActivityPub itself is
not utilized much in this scenario.

### Private Social Network or Group Chat

A small group of people who communicate online become dissatisfied with their
existing app's policies and decide to communicate privately. They would like to
develop their own system for communication.

Although ActivityPub does not define an encryption layer, messages could stay
local to a single server or could be exchanged between all parties in an
ephermeral way. Encryption could be a good addition, however.

## Architecture

This project aims to be agnostic as to how the data is stored, which server is
used, and which rendering engine is used. Plugins that conform to a specific
interface can be mixed and matched.

### Logic Layer

The logic layer that get included in all projects include these packages:

* `activitypub-core-types`
    * The TypeScript types.
* `activitypub-core-utilities`
    * Common functions with no dependencies on packages from upper layers.
* `activitypub-core`
    * Most of the logic for carrying out ActivityPub according to the spec.
* `activitypub-core-delivery`
    * All the logic specific to federation.

### Database Layer

Up from there is the database layer.

Currently this project comes with:

* `activitypub-core-mongodb`

### Server Layer

Then comes the server layer.

Currently this project comes with:

* `activitypub-core-express-middleware`

### UI Layer

Finally there's the UI/rendering layer.

Currently this project comes with:

* `activitypub-core-jsx-components`