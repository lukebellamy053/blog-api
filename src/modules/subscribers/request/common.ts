import {ApiProperty, ApiPropertyOptions} from "@nestjs/swagger";
import {applyDecorators} from "@nestjs/common";
import {IsNotEmpty, IsString} from "class-validator";

export const NonEmptyString = (apiProperties: ApiPropertyOptions) => applyDecorators(ApiProperty(apiProperties),IsString(), IsNotEmpty())
