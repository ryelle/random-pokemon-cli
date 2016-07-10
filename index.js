'use strict';

// Settings
const LANG = 'en';
const width = 60;

// External dependencies
const Request = require( 'request-promise' );
const find = require( 'lodash/find' );
const wrap = require( 'wordwrap' )( width );

// We randomly generate an ID between 1 - 721, since there are 721 entries.
// It's possible there's a skipped number, in which case we'll error. Oh well.
const id = Math.floor( Math.random() * 721 ) + 1;
const options = {
	uri: 'http://pokeapi.co/api/v2/pokemon-species/' + id + '/',
	json: true // Automatically parses the JSON string in the response 
};

// The names & flavor text come in multiple languages
// Let's only get the language we're using (set above)
function getLocalizedObject( names ) {
	return find( names, ( name ) => {
		return ( name.language.name === LANG );
	} );
}

console.log( "Fetching a pokemon…" );

Request( options ).then( ( response ) => {
	let title = getLocalizedObject( response.names ).name;
	let padding = new Array( Math.floor( ( width - title.length ) / 2 ) ).join( ' ' );

	// The "flavor text" comes with linebreaks, but we're reformatting the text, so we'll delete those.
	let flavorText = getLocalizedObject( response.flavor_text_entries ).flavor_text.replace( /\n/g, ' ' );

	console.log( Array( width + 1 ).join( '=' ) );
	console.log( padding, title );
	console.log( Array( width + 1 ).join( '-' ) );
	console.log( wrap( flavorText ) );
	console.log( Array( width + 1 ).join( '=' ) );

} ).catch( ( error ) => {
	console.error( error );
} );
