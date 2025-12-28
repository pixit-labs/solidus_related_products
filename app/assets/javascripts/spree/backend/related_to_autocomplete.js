/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
class RelatedToAutocomplete {
  constructor(relationTypeSelector, relatedToSelector) {
    this.relationTypeSelector = relationTypeSelector;
    this.relatedToSelector = relatedToSelector;
    this.initializeSelect(this.relationTypeSelector);
    this.setupListeners();
  }

  setupListeners() {
    return $(document).on('change', this.relationTypeSelector, event => {
      return this.initializeSelect(event.target);
    });
  }

  initializeSelect(target) {
    this.selectedType = $(target).find(":selected").data("relationType");
    if (this.selectedType === 'Spree::Variant') {
      this.initializeVariantSelect();
    } else if (this.selectedType === 'Spree::Product') {
      this.initializeProductSelect();
    }
    return $(this.relatedToSelector).css('display', 'block');
  }

  initializeProductSelect() {
    return $(this.relatedToSelector).productAutocomplete({ multiple: false });
  }

  initializeVariantSelect() {
    return $(this.relatedToSelector).variantAutocomplete();
  }
}

Spree.ready(function ($) {
  const relationTypeSelector = '.relation_type';
  const relatedToSelector = '.related_to_autocomplete';

  if ($(relationTypeSelector).is('*')) {
    return new RelatedToAutocomplete(relationTypeSelector, relatedToSelector);
  }
});
