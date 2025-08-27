# Changelog

## Version [0.22.0](https://github.com/cedx/base/compare/v0.21.1...v0.22.0)
- Added the `result` property to the `UI.Components.DialogBox` component.
- Fixed the `css()` and `html()` tag functions to handle arrays.
- Removed the `UI.Components.DialogButton` component.
- Renamed the `UI.Components.IMessage` interface to `IDialogMessage`.
- Restored the `notify()` method of the `UI.Components.Toaster` component.
- The `UI.Variant` enumeration now extends from `UI.Context`.

## Version [0.21.1](https://github.com/cedx/base/compare/v0.21.0...v0.21.1)
- Fixed issues in the `UI.Components.DialogButton` and `UI.Components.DialogBox` components.

## Version [0.21.0](https://github.com/cedx/base/compare/v0.20.0...v0.21.0)
- Added the `show()` and `hide()` methods to the `UI.Components.OfflineIndicator` component.
- Renamed the `UI.Components.MessageBox` component to `DialogBox`.
- Renamed the `Animation` property of UI components to `Fade`.
- Replaced the `Hidden` property of UI components by the `Open` property.

## Version [0.20.0](https://github.com/cedx/base/compare/v0.19.0...v0.20.0)
- Added the `Animation` property to the `LoadingIndicator` and `OfflineIndicator` UI components.
- Added the `css()` and `html()` tag functions.
- Removed the `createDocumentFragment()`, `trimArray()`, `trimObject()`, `waitForAnimations()` and `xmlEscape()` functions.
- Removed the `Hosting` and `Net` modules.
- The `getEaster()` and `getHolidays()` functions now take a `Date` object as parameter instead of a number.

## Version [0.19.0](https://github.com/cedx/base/compare/v0.18.0...v0.19.0)
- By default, the `LoadingIndicator` and `OfflineIndicator` UI components are no longer hidden.
- Use CSS classes instead of the `hidden` HTML attribute to show/hide the `LoadingIndicator` and `OfflineIndicator` UI components.

## Version [0.18.0](https://github.com/cedx/base/compare/v0.17.0...v0.18.0)
- Added the `UI.Components.MessageBox` component.
- Removed the `notify()` method of the `UI.Components.Toaster` component.

## Version [0.17.0](https://github.com/cedx/base/compare/v0.16.0...v0.17.0)
- Added the `UI.Components.IDialogButton` interface.
- Added the `Body` property to the `UI.Components.Toast` component.
- Added the `ChildContent` property to the `UI.Components.Toaster` component.
- Renamed the `UI.Components.Toast.hide()` method to `close()`.

## Version [0.16.0](https://github.com/cedx/base/compare/v0.15.3...v0.16.0)
- Added the `Center` value to the `UI.Alignment` enumeration.
- Added the `UI.DialogResult` enumeration.
- Added the `UI.Components.DialogButton` component.
- Removed the `UI.Components.ComponentBase` class and the dependency on [Lit](https://lit.dev).
- Renamed the `UI.MenuAlignment` enumeration to `Alignment`.

## Version [0.15.3](https://github.com/cedx/base/compare/v0.15.2...v0.15.3)
- Fixed a regression in the `UI.Components.ThemeDropdown` component.

## Version [0.15.2](https://github.com/cedx/base/compare/v0.15.1...v0.15.2)
- Fixed a regression in the `UI.Components.TabActivator` component.

## Version [0.15.1](https://github.com/cedx/base/compare/v0.15.0...v0.15.1)
- Fixed a regression in the `UI.Components.Toaster` component.

## Version [0.15.0](https://github.com/cedx/base/compare/v0.14.1...v0.15.0)
- Added the `Open` property to the `UI.Components.Toast` component.
- Renamed the `start()` and `stop()` methods of the `UI.Components.LoadingIndicator` component to `show()` and `hide()`.

## Version [0.14.1](https://github.com/cedx/base/compare/v0.14.0...v0.14.1)
- Fixed the `UI.Components.Toast` and `UI.Components.Toaster` components not respecting the default `Icon` based on their `Context`.

## Version [0.14.0](https://github.com/cedx/base/compare/v0.13.1...v0.14.0)
- Added the `UI.Components.BackButton` and `UI.Components.Toaster` components.

## Version [0.13.1](https://github.com/cedx/base/compare/v0.13.0...v0.13.1)
- Added the `UI.Components.Toast` component to the global `HTMLElementTagNameMap` interface.

## Version [0.13.0](https://github.com/cedx/base/compare/v0.12.0...v0.13.0)
- Renamed the `ToBoostrap()` enumeration methods to `ToCss()`.
- Replaced `Left` and `Right` values by `Start` and `End` in the `UI.Position` enumeration.

## Version [0.12.0](https://github.com/cedx/base/compare/v0.11.0...v0.12.0)
- Added the `close()`, `open()` and `save()` methods to the `UI.Components.ThemeDropdown` component.
- Added the `UI.Position` enumeration.
- Added the `UI.Components.Toast` component.

## Version [0.11.0](https://github.com/cedx/base/compare/v0.10.1...v0.11.0)
- Added the `UI.Size` and `UI.Variant` enumerations.
- Replaced the one-based indexes by zero-based indexes in `Data.Pagination` and `UI.Components.TabActivator` classes.

## Version [0.10.1](https://github.com/cedx/base/compare/v0.10.0...v0.10.1)
- Fixed the `UI.Components.KeyboardAccelerator` component.

## Version [0.10.0](https://github.com/cedx/base/compare/v0.9.0...v0.10.0)
- Added the `UI.KeyboardModifiers` enumeration.
- Added the `UI.Components.KeyboardAccelerator` component.
- Removed the `Hide()` and `Show()` methods from the `LoadingIndicator` and `OfflineIndicator` UI components.

## Version [0.9.0](https://github.com/cedx/base/compare/v0.8.0...v0.9.0)
- Added the `Hide()` and `Show()` methods to the `LoadingIndicator` and `OfflineIndicator` UI components.
- Added the `UI.StorageArea` enumeration.
- Added the `UI.Components.TabActivator` component.

## Version [0.8.0](https://github.com/cedx/base/compare/v0.7.0...v0.8.0)
- Added the `Hosting.Environment` enumeration.
- Added the `Hosting.HostEnvironment` class.
- Removed the `Net.Http.HttpClient` and `Net.Http.HttpRequestError` classes.
- Renamed the `Slot` property of UI components to `ChildContent`.

## Version [0.7.0](https://github.com/cedx/base/compare/v0.6.0...v0.7.0)
- Removed the `Abstractions` and `DependencyInjection` modules.
- Renamed the `Html` module to `UI`.
- Renamed the `Http` module to `Net.Http`.
- Renamed the `Http.HttpError` class to `Net.Http.HttpRequestError`.
- Renamed the `Http.StatusCodes` enumeration to `Net.Http.StatusCode`.
- Renamed the `UI.Component` class to `UI.Components.ComponentBase`.
- Moved the UI components to the `UI.Components` module.
- Added the `Data.Mapping.JsonArrayTypeHandler` and `Data.Mapping.JsonObjectTypeHandler` classes.
- Added the `Net.Http.HttpMethod` enumeration.
- Added the `Net.Mime.DispositionType` and `Net.Mime.MediaType` enumerations.

## Version [0.6.0](https://github.com/cedx/base/compare/v0.5.0...v0.6.0)
- Added the `Data.Pagination` and `Data.PaginatedList` classes.
- Added the `UI.Component` class.

## Version [0.5.0](https://github.com/cedx/base/compare/v0.4.1...v0.5.0)
- Added the `Data.Sort` class.
- Added the `Data.SortOrder` enumeration.
- Added the `UI.ActionBar` component.

## Version [0.4.1](https://github.com/cedx/base/compare/v0.4.0...v0.4.1)
- Fixed the [NuGet](https://www.nuget.org) packaging.

## Version [0.4.0](https://github.com/cedx/base/compare/v0.3.0...v0.4.0)
- Added the `UI.ComponentRenderer` class.

## Version [0.3.0](https://github.com/cedx/base/compare/v0.2.0...v0.3.0)
- Removed the dependency on [Lit](https://lit.dev).

## Version [0.2.0](https://github.com/cedx/base/compare/v0.1.0...v0.2.0)
- Added the `Duration` and `Html.Context` enumerations.
- Added the `UI.MenuActivator` component.

## Version 0.1.0
- Initial release.
