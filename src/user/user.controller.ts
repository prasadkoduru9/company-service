import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('SignUp')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('SignIn')
  signIn(@Body() createUserDto: CreateUserDto): Promise<{ accessToken }> {
    return this.userService.signIn(createUserDto);
  }

  // @Get()
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth('access-token')
  // findAll(@Req() req) {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // @ApiBearerAuth('access-token')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiBearerAuth('access-token')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @ApiBearerAuth('access-token')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
