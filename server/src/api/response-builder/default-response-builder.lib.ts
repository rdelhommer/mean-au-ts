import { ResponseBuilder } from "api/response-builder/response-builder.lib";
import { RoleResponseBuilderStep } from "api/response-builder/role-response-builder-step.lib";
import { TokenResponseBuilderStep } from "api/response-builder/token-response-builder-step.lib";
import { MaskResponseBuilderStep } from "api/response-builder/mask-response-builder-step.lib";
import { Enums } from "mean-au-ts-shared";

export class DefaultResponseBuilder extends ResponseBuilder {
  constructor(maskMap?: Map<Enums.UserRoles, Function>) {
    let steps = [
      new RoleResponseBuilderStep(),
      new TokenResponseBuilderStep(),
      new MaskResponseBuilderStep(maskMap)
    ];

    super(steps);
  }
}