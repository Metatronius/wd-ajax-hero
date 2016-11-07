( function()
{
  'use strict';

  var movies = [];

  var renderMovies = function()
  {
    $( '#listings' ).empty();

    for ( var movie of movies )
    {
      var $col = $( '<div class="col s6">' );
      var $card = $( '<div class="card hoverable">' );
      var $content = $( '<div class="card-content center">' );
      var $title = $( '<h6 class="card-title truncate">' );

      $title.attr(
      {
        'data-position': 'top',
        'data-tooltip': movie.title
      } );

      $title.tooltip(
      {
        delay: 50,
      } );
      $title.text( movie.title );

      var $poster = $( '<img class="poster">' );

      $poster.attr(
      {
        src: movie.poster,
        alt: `${movie.poster} Poster`
      } );

      $content.append( $title, $poster );
      $card.append( $content );

      var $action = $( '<div class="card-action center">' );
      var $plot = $(
        '<a class="waves-effect waves-light btn modal-trigger">' );

      $plot.attr( 'href', `#${movie.id}` );
      $plot.text( 'Plot Synopsis' );

      $action.append( $plot );
      $card.append( $action );

      var $modal = $( `<div id="${movie.id}" class="modal">` );
      var $modalContent = $( '<div class="modal-content">' );
      var $modalHeader = $( '<h4>' ).text( movie.title );
      var $movieYear = $( '<h6>' ).text( `Released in ${movie.year}` );
      var $modalText = $( '<p>' ).text( movie.plot );

      $modalContent.append( $modalHeader, $movieYear, $modalText );
      $modal.append( $modalContent );

      $col.append( $card, $modal );

      $( '#listings' ).append( $col );

      $( '.modal-trigger' ).leanModal();
    }
  };
  $( '#submit' ).click(
    function( event )
    {
      event.preventDefault();
      console.log(!($('#search').val()===''));
      if($('#search').val()!='')//evaluates to true unless val is empty
      {
      var searchTerms = $( '#search' ).val();
      $.get(
          `https://www.omdbapi.com/?s=${searchTerms}&y=&plot=short&r=json`,
          function() {} )
        .done( function( data )
        {
          for ( var i = 0; i < data.Search.length; i++ )
          {
            var movie =
            {
              id: data[ 'Search' ][ i ][ 'imdbID' ],
              poster: data[ 'Search' ][ i ][ 'Poster' ],
              title: data[ 'Search' ][ i ][ 'Title' ],
              year: data[ 'Search' ][ i ][ 'Year' ],
              plot: ''
            };
            movies.push( movie );
            renderMovies();
          } // end of for loop about data results length
        } ); //end of ajax call
        movies = [];
      }//end of if
      else//search field is blank
      {
        movies = [];
        renderMovies();
      }
    }
  );
  // ADD YOUR CODE HERE
} )();
