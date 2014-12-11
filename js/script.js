$(init);
var Q_MAX = 5,
    qId;

function init() {
    $('button.next').click(nextSection);
    $('button.answer').click(selectAnswer);
    setup();
}

function setup() {
    qId = 0;

    $('.page:not(:first-child), .page section:not(:first-child)').css({
        display: 'none'
    });

    for (var i = 0, max = data.length; i < max; i++) {
        data[i].count = 0;
        $('.gage.' + data[i].cssClass).css({
            width: '0%'
        });
    }

    $(document.body).show();
}

function nextSection(node) {
    var $currentSection = $(this).parents('section'),
        $nextSection = $currentSection.next(),
        $currentPage, $nextPage;

    if ($nextSection.length === 0) {
        $currentPage = $currentSection.parents('.page');
        $nextPage = $currentPage.next();

        $currentPage.fadeOut(300);
        $nextPage.fadeIn(300);
    } else {
        $currentSection
            .fadeOut(300, function() {
                $nextSection.fadeIn(300);
            });
    }
}

function selectAnswer() {
    var $button = $(this),
        $buttonIndex = $button.parent().children().index($button) - 1;

    console.log($buttonIndex, qId);

    for (var i = 0, max = data.length; i < max; i++) {
        if (data[i].data[qId] === $buttonIndex) {
            data[i].count++;
            $('.gage.' + data[i].cssClass).css({
                width: 100 * data[i].count / Q_MAX + '%'
            });
            $('.gage2.' + data[i].cssClass).css({
                height: 200 * data[i].count / Q_MAX
            });
        }
    }

    qId++;
    if (qId === Q_MAX) result();
    nextSection.call(this);
};

function result() {
    var maxp = -1,
        party = [],
        text1, text2;

    for (var i = 0, max = data.length; i < max; i++) {
        if (data[i].count > maxp) {
            maxp = data[i].count;
            party = [data[i].name];
        } else if (data[i].count === maxp) {
            party.push(data[i].name);
        }
    }

    text1 = 'あなたの考えに最も近い政党は、' + party.join('、') + 'です。';
    $('#mes').text(text1);
}

data = [{
    name: '自民党',
    cssClass: 'jimin',
    data: [
        0, 0, 0, 0, 0
    ]
}, {
    name: '民主党',
    cssClass: 'minshu',
    data: [
        1, 1, 1, 1, 1
    ]
}, {
    name: '維新の党',
    cssClass: 'ishin',
    data: [
        1, 0, 1, 0, 1
    ]
}, {
    name: '公明党',
    cssClass: 'komei',
    data: [
        0, 0, 0, 0, 0
    ]
}, {
    name: '共産党',
    cssClass: 'kyosan',
    data: [
        1, 1, 1, 1, 1
    ]
}, {
    name: '生活の党',
    cssClass: 'seikatu',
    data: [
        1, 1, 1, 0, 1
    ]
}, {
    name: '社民党',
    cssClass: 'shamin',

    data: [
        2, 1, 1, 1, 1
    ]
}, {
    name: '次世代の党',
    cssClass: 'jisedai',
    data: [
        1, 0, 0, 0, 0
    ]
}]
