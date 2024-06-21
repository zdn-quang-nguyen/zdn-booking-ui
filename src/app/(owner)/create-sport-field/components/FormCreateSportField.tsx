'use client';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import { cn } from '@/libs/utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './formCreateSportField.module.scss';
import iconUpImage from '/public/images/icons_add_image.png';
import { postData } from '../api/createSportFieldService';
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} không được để trống!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

type FieldType = {
  name: string;
  category: string;
  address: {
    province: number | undefined;
    district: number | undefined;
    ward: number | undefined;
    addressDetail: string;
  };
  phoneNumber: string;
  openTime: [string, string];
  price: number | undefined;
  rules: string;
  quantity: number;
  images: string[];
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
  postData(values).then((result) => {
    console.log('Server response:', result);
  });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type FormCreateSportFieldProps = {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
};

const FormCreateSportField: React.FC<FormCreateSportFieldProps> = ({
  provinces,
  districts,
  wards,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
    }
  };

  const [selectedProvince, setSelectedProvince] = useState<number | undefined>(
    undefined,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<number | undefined>(
    undefined,
  );
  const [selectedWard, setSelectedWard] = useState<number | undefined>(
    undefined,
  );

  const handleProvinceChange = (value: number) => {
    setSelectedProvince(value);
    setSelectedDistrict(undefined); // Reset district when province changes
    setSelectedWard(undefined); // Reset ward when province changes
    console.log('Province changed', value);
  };

  const handleDistrictChange = (value: number) => {
    setSelectedDistrict(value);
    setSelectedWard(undefined); // Reset ward when district changes
    console.log('District changed', value);
  };

  return (
    <div
      className={cn(
        styles.createSportFileContainer,
        'mx-auto mt-12 flex w-1/2 flex-col gap-8 rounded-form bg-neutral p-10',
      )}
    >
      <h4 className="font-bold text-natural-700">Tạo sân</h4>
      <Form
        // form={form}
        name="Create Sport Field"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ minWidth: '100%', maxWidth: 6 }}
        initialValues={{ remember: true }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        validateMessages={validateMessages}
      >
        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">
            Thông tin cơ bản
          </p>
          <Form.Item
            label="Tên sân"
            name="username"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Tên sân!' },
              { type: 'string', min: 6, message: 'Tên sân tối thiểu 6 ký tự' },
              {
                type: 'string',
                max: 120,
                message: 'Tên sân không vượt quá 120 ký tự',
              },
            ]}
          >
            <Input
              showCount
              maxLength={120}
              placeholder="Nhập tên sân"
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: 'Vui lòng nhập Danh mục' }]}
          >
            <Select placeholder="Nhập Danh mục">
              <Select.Option value="basketball">Sân bóng rổ</Select.Option>
              <Select.Option value="volleyball">Sân bóng chuyền</Select.Option>
              <Select.Option value="badminton">Sân cầu lông</Select.Option>
              <Select.Option value="tennis">Sân tennis</Select.Option>
              <Select.Option value="football">Sân bóng đá</Select.Option>
              <Select.Option value="tableTennis">Sân bóng bàn</Select.Option>
              <Select.Option value="billiards">Bi-da</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
            <Select
              placeholder="Tỉnh"
              onChange={handleProvinceChange}
              value={selectedProvince}
            >
              {provinces.map((province) => (
                <Select.Option key={province.id} value={province.id}>
                  {province.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Quận/Huyện"
              onChange={handleDistrictChange}
              value={selectedDistrict}
            >
              {districts
                .filter(
                  (district) =>
                    district.provinceId === selectedProvince?.toString(),
                )
                .map((district) => (
                  <Select.Option key={district.id} value={district.id}>
                    {district.name}
                  </Select.Option>
                ))}
            </Select>
            <Select
              placeholder="Phường/Xã"
              value={selectedWard}
              onChange={(value) => setSelectedWard(value)}
            >
              {wards
                .filter(
                  (ward) => ward.districtId === selectedDistrict?.toString(),
                )
                .map((ward) => (
                  <Select.Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Vui lòng nhập Số điện thoại' },
              {
                type: 'string',
                max: 9,
                message: 'Số điện thoại không vượt quá 9 số',
              },
            ]}
          >
            <Input
              prefix="(+84) "
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Form.Item>
          <Form.Item
            label="Thời gian mở cửa"
            name="OpenTime"
            style={{ width: '100%', borderRadius: '40px' }}
            rules={[
              { required: true, message: 'Vui lòng nhập Thời gian mở cửa' },
            ]}
          >
            <RangePickerComponent />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Giá tiền</p>
          <Form.Item
            name="price"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Vui lòng nhập Giá tiền',
              },
            ]}
          >
            <InputNumber
              suffix="đ / tiếng"
              style={{ width: '120%', borderRadius: '40px' }}
            />
          </Form.Item>
        </div>

        <div className="flex w-full flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Quy đinh sân</p>
          <Form.Item
            name="rule"
            rules={[{ required: true, message: 'Vui lòng nhập Quy định sân' }]}
            style={{ width: '120%' }}
          >
            <TextArea rows={5} style={{ borderRadius: '20px' }} />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">Số sân</p>
          <Form.Item
            name="quantity"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Vui lòng nhập Số sân',
              },
            ]}
          >
            <Button
              type="text"
              style={{
                background: '#F4F1FF',
                border: 'none',
                borderRadius: '40px',
                width: '44px',
                height: '44px',
              }}
              icon={<MinusOutlined style={{ color: '#967DDD' }} />}
              onClick={() => handleQuantityChange(quantity - 1)}
            />
            <InputNumber
              value={quantity}
              onChange={handleQuantityChange}
              style={{
                margin: '0 10px',
                borderRadius: '40px',
                borderColor: '#F4F1FF',
                backgroundColor: '#F4F1FF',
                width: '44px',
                textAlign: 'center',
              }}
            />
            <Button
              type="text"
              style={{
                background: '#F4F1FF',
                border: 'none',
                borderRadius: '40px',
                width: '44px',
                height: '44px',
              }}
              icon={<PlusOutlined style={{ color: '#967DDD' }} />}
              onClick={() => handleQuantityChange(quantity + 1)}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <p className="body-2 mb-5 font-bold text-natural-700">
            Hình ảnh{' '}
            <span className="body-5 mx-3 text-natural-400">
              Kích thước tiêu chuẩn 1200*389 px
            </span>
          </p>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="images"
            rules={[{ required: true, message: 'Vui lòng nhập Hình ảnh' }]}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: '2px',
                  background: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                type="button"
              >
                <Image
                  src={iconUpImage}
                  alt="icon-up-image"
                  width={40}
                  height={40}
                />
                <div
                  style={{ marginTop: 8 }}
                  className="body-5 text-accent-600"
                >
                  Tải hình ảnh lên
                </div>
              </button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCreateSportField;
