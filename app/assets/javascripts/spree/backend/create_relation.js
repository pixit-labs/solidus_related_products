/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
class CreateRelation {
  constructor(addRelationSelector) {
    this.addRelationSelector = addRelationSelector;
    this.relatedToInputSelector = '#add_related_to_name';
    this.relationTypeInputSelector = '#add_type';
    this.discountInputSelector = '#add_discount';
    this.descriptionInputSelector = '#add_description';

    this.setupListeners();
  }

  setupListeners() {
    return $(document).on('click', this.addRelationSelector, event => {
      event.preventDefault();
      return this.sendCreateAction(event.target);
    });
  }

  sendCreateAction(target) {
    if ($(this.relatedToInputSelector).val()) {
      const update_target = $(target).data('update');
      return $.ajax({
        dataType: 'script',
        url: $(target).attr('href'),
        type: 'POST',
        data: {
          'relation[related_to_id]': $(this.relatedToInputSelector).val(),
          'relation[relation_type_id]': $(this.relationTypeInputSelector).val(),
          'relation[discount_amount]': $(this.discountInputSelector).val(),
          'relation[description]': $(this.descriptionInputSelector).val()
        }
      });
    }
  }
}

Spree.ready(function ($) {
  const addRelationSelector = '#add_related_product';

  if ($(addRelationSelector).is('*')) {
    return new CreateRelation(addRelationSelector);
  }
});
