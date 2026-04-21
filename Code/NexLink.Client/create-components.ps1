# 1. Header Sections
$headerComponents = @(
    "status-form.component", "exporter-form.component", "shipping-form.component", "consignee-form.component",
    "customs-form.component", "inspection-form.component", "ship-hold-form.component", "transit-form.component",
    "support-docs-form.component", "miscellaneous-form.component"
)

Write-Host " Generating Header Sections..." 
foreach ($comp in $headerComponents) {
    ng generate component "features/rex-management/components/editor/header-sections/$comp"  --standalone --style=scss
}

# 2. Line Item Sections
$lineComponents = @(
    "product-details-form.component", "packaging-metrics-form.component", "usage-details-form.component",
    "dept-requirements-form.component", "establishment-details-form.component", "treatment-details-form.component",
    "container-details-form.component", "item-docs-form.component", "cert-details-form.component", "additional-details-form.component"
)

Write-Host " Generating Line Item Sections..."
foreach ($comp in $lineComponents) {
    ng generate component "features/rex-management/components/editor/line-item-sections/$comp"  --standalone --style=scss
}

Write-Host "Done!" 