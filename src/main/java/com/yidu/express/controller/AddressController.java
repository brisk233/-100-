package com.yidu.express.controller;

import com.yidu.express.serviceXzy.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * (Address)表控制层
 *
 * @author makejava
 * @since 2021-04-15 16:18:53
 */
@Controller
public class AddressController {
    /**
     * 服务对象
     */
    @Autowired
    private AddressService addressService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */


}