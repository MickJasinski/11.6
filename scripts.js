$(function() {

    // id generator
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // column
    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        // create column
        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('X');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            // remove column
            $columnDelete.click(function() {
                self.removeColumn();
            });
            // add card
            $columnAddCard.click(function() {
                var cardName = prompt("Enter the name of the card");
                if (cardName == '') {
                    cardName = 'New card';
                }
                if (cardName != null) {
                        self.addCard(new Card(cardName));
                } 
                // if (cardName == '') {
                //     self.addCard(new Card('New card'));
                // } else if (cardName == null) {
                //     return null;
                // } else {
                //     self.addCard(new Card(cardName));
                // }
            });
        // column content
        $column.append($columnDelete)
            .append($columnTitle)
            .append($columnAddCard)
            .append($columnCardList);
        return $column;
    }
}

Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
        this.$element.remove();
    }
};

// card
function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    // create card
    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete').text('X');
        // remove card
        $cardDelete.click(function() {
            self.removeCard();
        });
        // card elements
        $card.append($cardDelete)
            .append($cardDescription);
        return $card;
    }
}

Card.prototype = {
    removeCard: function() {
        this.$element.remove();
    }
};

// board
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container'),
    addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    }
};

// add drag & drop
function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}

// create column action
$('.create-column')
.click(function() {
    var columnName = prompt('Enter a column name');
    var column = column;
    if (columnName == '') {
        column = new Column('New column')
    } else if (columnName == null) {
        return null;
    } else {
        var column = new Column(columnName);
    }
    board.addColumn(column);

});


var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// add columns to the board
board.addColumn(todoColumn); board.addColumn(doingColumn); board.addColumn(doneColumn);

// create cards
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// add cards to columns
todoColumn.addCard(card1); doingColumn.addCard(card2);

});