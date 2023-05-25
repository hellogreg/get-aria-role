# get-aria-role

in the course of accessibility work, there are cases where it could be handy to know what implicit or computed ARIA role an element has. Unfortunately, there's no native way to get this value with JavaScript in most browsers.

(_Explicitly_ declared roles can be gleaned via `element.role` or `element.getAttribute("role")`.)

Chromium does have the [computedRole property](https://chromestatus.com/feature/5530552681627648) for elements, but it's behind a flag--and they apparently [don't plan on unflagging it](https://bugs.chromium.org/p/chromium/issues/detail?id=442978). It also may not be reliable in all cases (e.g., it can return a `gridcell` role value for `td` elements, by default, even when the `td` is in a `table` without a `grid` role).

get-aria-role comprises the following three global functions:

- getAriaRole(_element_):
- getImplicitRole(_element_)
- getExplicitRole(_element_)

**getAriaRole()** returns the current ARIA role of an element. If the element has an explicit role, it uses that. If not, then it uses the implicit role.

Implicit roles have been gathered from the W3C's [HTML Element Role Mappings](https://www.w3.org/TR/html-aam-1.0/#html-element-role-mappings), current as of 5/19/2023.
