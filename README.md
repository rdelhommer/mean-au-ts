TODO

Currently have to do the following hack...

There is a conflict in the typings between aurelia-binding and aurelia-validation.  Until aurelia-validation is updated, you have to manually remove the re-export of the aurelia-binding module in dist/*/property-info.d.ts where * is the module resolution strategy you're using (commonjs for the current configuration)
