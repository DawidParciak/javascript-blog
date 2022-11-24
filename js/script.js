'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html += linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999,
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }

    console.log(tag + ' is used ' + tags[tag] + ' times ');

  }

  return params;

}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}



function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles){

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */

      const linkHTMLTag = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      /* [DONE] add generated code to html variable */

      html = html + linkHTMLTag + ' ';

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags[tag]) {

        /* [NEW] add generated code to allTags array */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* [DONE] END LOOP: for each tag */

    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */

  let allTagsHTML = '';
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsPerams: ', tagsParams);

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */

    const tagLinkHTML ='<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */

  }

  /*[NEW] add HTML from allTagsHTML to tagList */

  tagList.innerHTML = allTagsHTML;
  //console.log(allTagsHTML);

}

generateTags();

function tagClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for(let activeTag of activeTags){

    /* [DONE] remove class active */

    activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagHref = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for(let tagLink of tagHref){

    /* [DONE] add class active */

    tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */

  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */

  for(let link of allLinksToTags){

    /* [DONE] add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */

  }

}

addClickListenersToTags();

function generateAuthors(){

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles){

    /* [DONE] find authors wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* [DONE] get authors from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */

    const linkHTMLTag = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;

    /* [DONE] add generated code to html variable */

    html += linkHTMLTag;

    /* [DONE] insert HTML of all the links into the authors wrapper */

    authorsWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */

  }

}

generateAuthors();

function authorClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');

  /* [DONE] find all author links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */

  for(let activeAuthor of activeAuthors){

    /* [DONE] remove class active */

    activeAuthor.classList.remove('active');

    /* [DONE] END LOOP: for each active author link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const authorHref = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */

  for(let authorLink of authorHref){

    /* [DONE] add class active */

    authorLink.classList.add('active');

    /* [DONE] END LOOP: for each found author link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author ="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* [DONE] find all links to authors */

  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for(let link of allLinksToAuthors){

    /* [DONE] add authorClickHandler as event listener for that link */

    link.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */

  }

}

addClickListenersToAuthors();
