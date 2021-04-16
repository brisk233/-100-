package com.yidu.express.entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * (Address)实体类
 *
 * @author makejava
 * @since 2021-04-15 16:18:51
 */
@Component
public class Address implements Serializable {
    private static final long serialVersionUID = 495650694170546125L;
    /**
    * 地址表id
    */
    private Integer addressId;
    /**
    * 客户id
    */
    private Integer customerId;
    /**
    * 地址状态 1：发货地址 2：收货地址
    */
    private Integer addressState;
    /**
    * 联系电话
    */
    private String addressPhone;
    /**
    * 联系人姓名
    */
    private String addressName;
    /**
    * 邮编
    */
    private String postcode;
    /**
    * 省
    */
    private String province;
    /**
    * 市
    */
    private String city;
    /**
    * 区
    */
    private String district;
    /**
    * 街道（详细地址）
    */
    private String street;
    /**
    * 状态 1：可用 0：不可用
    */
    private Integer state;


    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getAddressState() {
        return addressState;
    }

    public void setAddressState(Integer addressState) {
        this.addressState = addressState;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public String getAddressName() {
        return addressName;
    }

    public void setAddressName(String addressName) {
        this.addressName = addressName;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

}